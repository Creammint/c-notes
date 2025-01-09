# API 接口调用同步

## 数据推送

### 接口文档说明

其他平台接口文档，会有字段说明是否必填之类的，需要注意这些；

![image-20250109193021096](https://y.creammint.cn/articles/images/image-20250109193021096.png)

### 背景需求

A 系统的 XXX 功能，在审批结束时，需要同步数据到 B 系统的 XXX 功能上；

通过监听器，监听审批流程的状态，判断完成的时间节点上调用此监听器，同步到 B 系统；

**监听器**：BpmOAVdragmtadjTaskListener

**实体类**：C3VdragmtadjCreate

**具体实现流程**：

> 1. 通过监听器获取审批完成；
> 2. 获取 B 系统的 API 接口文档，把对应的请求参数建成实体类；
> 3. 组装参数 发送请求同步到 B 系统上面；

### BpmOAVdragmtadjTaskListener

```java
@Slf4j
@Component
@RequiredArgsConstructor
public class BpmOAVdragmtadjTaskListener implements TaskListener {
    private final CpApi cpApi;
    private final BpmProcessInstanceCopyService bpmProcessInstanceCopyService;
    private final ConfigApi configApi;
    private final AdminUserApi adminUserApi;
    private final VdragmtadjService vdragmtadjService;

    /**
     * 添加抄送人
     */
    @Override
    public void notify(DelegateTask task) {
        log.info("[BpmOASupplierPBTaskListener] Start processing task: {}", task);

        // 获取配置的抄送人用户名
        String copyUserIdsStr = configApi.getConfigKey("bpm.vdragmtadj-copy-user").getCheckedData();
        if (StrUtil.isBlank(copyUserIdsStr)) {
            log.warn("[BpmOASupplierPBTaskListener] No copy users configured.");
            return;
        }

        // 获取用户列表
        List<String> copyUserList = StrUtil.split(copyUserIdsStr, StrUtil.COMMA).stream().toList();
        List<AdminUserRespDTO> userList = adminUserApi.getUserLists().getData();

        // 筛选匹配的用户ID
        List<Long> copyUserIds = userList.stream()
                .filter(user -> copyUserList.contains(user.getUsername()))
                .map(AdminUserRespDTO::getId)
                .collect(Collectors.toList());

        log.info("[BpmOASupplierPBTaskListener] 流程实例: [{}]，增加抄送人: [{}]", task.getProcessInstanceId(), copyUserIds);


        // 增加抄送人
        bpmProcessInstanceCopyService.createProcessInstanceCopy(copyUserIds, task.getId());

        // 获取流程相关单据
        VdragmtadjDO vdragmtadj = vdragmtadjService.getVdragmtadj(task.getProcessInstanceId());
        if (vdragmtadj == null) {
            throw exception(VDRAGMTADJ_NOT_EXISTS);
        }

        // 同步数据到 C3
        syncToC3(vdragmtadj);
    }
    /**
     * 同步数据到 C3
     */
    private void syncToC3(VdragmtadjDO vdragmtadj) {
        try {
            // 获取当前日期和时间
            LocalDateTime currentDateTime = LocalDateTime.now();
            // 格式化为日期和时间
            String formattedTime = currentDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            // 提取日期部分
            String formattedDate = currentDateTime.toLocalDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            String endDate = "2099-01-01";

            // 创建同步对象
            C3VdragmtadjCreate vdragmtadjCreate = new C3VdragmtadjCreate()
                    .setLstupdTime(formattedTime)
                    .setOrgViser(vdragmtadj.getVendorContacts())
                    .setPartnerNum(vdragmtadj.getNum())
                    .setPrefer(vdragmtadj.getFirstCooperate())
                    .setSrcCls(vdragmtadj.getSrccls())
                    .setVendorCode(vdragmtadj.getVendorCode());

            // 转换订单明细
            List<C3VdragmtadjCreate.OrderDetail> details = vdragmtadj.getVdragmtadjDetailsDOList().stream()
                    .map(detailDO -> convertToOrderDetail(detailDO, formattedDate, endDate))
                    .collect(Collectors.toList());
            vdragmtadjCreate.setDetails(details);

            // 调用同步服务
            vdragmtadjService.getVdragmtadjPushOrders(vdragmtadjCreate);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 转换单条订单明细
     */
    private C3VdragmtadjCreate.OrderDetail convertToOrderDetail(VdragmtadjDetailsDO detailDO,
                                                                String formattedDate, String endDate) {
        return new C3VdragmtadjCreate.OrderDetail(
                null,
                formattedDate,
                endDate,
                detailDO.getGoodsCode(),
                0, 0,
                null,
                detailDO.getPrice(),
                detailDO.getPackingSpecification(),
                null,
                null, detailDO.getTaxrate()
        );
    }
}
```

### 实体类

#### C3VdragmtadjCreate

```java
@Data
public class C3VdragmtadjCreate {
    /**
     * 最后修改时间
     */
    private String lstupdTime;
    /**
     * 备注
     */
    private String note;
    /**
     * 所属组织代码，0001
     */
    private String orgCode;
    /**
     * 对方签约人
     */
    private String orgViser;
    /**
     * 合作方唯一编码，单号
     */
    private String partnerNum;
    /**
     * 	是否首选供应商，0-否，1-是
     */
    private Integer prefer;
    /**
     * 	来源类型
     */
    private String srcCls;
    /**
     * 	供应商代码
     */
    private String vendorCode;
    private List<OrderDetail> details;

    @Data
    public static class OrderDetail {
        /**
         * 批次号
         */
        private String batchNum;
        /**
         * 开始时间
         */
        private String beginDate;
        /**
         * 结束时间,
         */
        private String endDate;
        /**
         * 商品代码
         */
        private String goodsCode;
        /**
         * 最小订货量
         */
        private Integer minOrderQty;
        /**
         * 拆分起订量
         */
        private Integer minSplitOrderQty;
        /**
         * 备注
         */
        private String note;
        /**
         * 采购规格价
         */
        private double price;
        /**
         * 包装规格
         */
        private String qpcStr;
        /**
         * 	质量标准
         */
        private String qualitySpec;
        /**
         * 供货配比
         */
        private Integer supplyRatio;
        /**
         * 采购税率
         */
        private double taxRate;

        // 构造函数
        public OrderDetail(String batchNum, String beginDate, String endDate, String goodsCode, Integer minOrderQty, Integer minSplitOrderQty, String note, double price, String qpcStr, String qualitySpec, Integer supplyRatio, double taxRate) {
            this.batchNum = batchNum;
            this.beginDate = beginDate;
            this.endDate = endDate;
            this.goodsCode = goodsCode;
            this.minOrderQty = minOrderQty;
            this.minSplitOrderQty = minSplitOrderQty;
            this.note = note;
            this.price = price;
            this.qpcStr = qpcStr;
            this.qualitySpec = qualitySpec;
            this.supplyRatio = supplyRatio;
            this.taxRate = taxRate;
        }
    }
}
```

#### HdToolProperties

这里的 `@ConfigurationProperties(prefix = "yudao.hd3c")` 是 nacos 上的配置；

```java
@Data
@Component
@RefreshScope
@ConfigurationProperties(prefix = "yudao.hd3c")
public class HdToolProperties {
    @NotEmpty(message = "accessKey不能为空")
    private String accessKey;

    @NotEmpty(message = "accessSecret不能为空")
    private String accessSecret;

    @NotEmpty(message = "sid不能为空")
    private String sid;

    @NotEmpty(message = "baseurl不能为空")
    @URL(message = "baseurl")
    private String baseurl;
}
```

#### nacos 配置

![image-20250109194632877](https://y.creammint.cn/articles/images/image-20250109194632877.png)

### service 层

VdragmtadjServiceImpl

```java
@Service
@Validated
public class VdragmtadjServiceImpl extends ServiceImpl<VdragmtadjMapper, VdragmtadjDO> implements VdragmtadjService {
 	@Resource
    private HdToolProperties hdToolProperties;


    @Override
    public Boolean getVdragmtadjPushOrders(C3VdragmtadjCreate vdragmtadjCreate){
        try{
            String path = "/h6-openapi2-service/v1/vendoragmt/change";
            vdragmtadjCreate.setOrgCode("0001");

            Map<String, String> headers = new HashMap<>();
            JSONObject body = new JSONObject();
            // 将 Vdragmtadj 对象转换为 JSONObject
            JSONObject vdragmtadjJson = new JSONObject(vdragmtadjCreate);
            // 创建 JSONArray 并添加 JSONObject
            JSONArray vdragmtadjs = new JSONArray();
            vdragmtadjs.add(vdragmtadjJson.toString());
            body.set("vdragmtadj", vdragmtadjCreate);
            log.info("body  :{}", body.get("vdragmtadj"));

            String authorization = HdC3SignUtil.sign(path, "POST", body.get("vdragmtadj").toString(), hdToolProperties.getAccessKey(), hdToolProperties.getAccessSecret());
            headers.put("Authorization", authorization);
            headers.put("sid", hdToolProperties.getSid());
            String url = hdToolProperties.getBaseurl() + path;
            OkHttpClientUtils.post(url, headers, body.get("vdragmtadj").toString());
            return true;
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
```

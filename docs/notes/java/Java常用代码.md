# Java 常用代码

## 日期

### 获取当前日期

```Java
import org.springframework.data.redis.core.StringRedisTemplate;

{
    // 获取当前时间
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Date date = new Date();
    //格式化当期日期
    String todayTime = sdf.format(date);
}
```

### 时间戳转字符串

```Java
//处理日期传值 时间戳 -》 字符串
LocalDateTime dateStartTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(sortDetailsVo.getStartTimeStamp()), ZoneId.systemDefault());
LocalDateTime dateEndTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(sortDetailsVo.getEndTimeStamp()), ZoneId.systemDefault());
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
sortDetailsVo.setStartTime(dateStartTime.format(formatter));
sortDetailsVo.setEndTime(dateEndTime.format(formatter));
```

### 获取月份集合

```java
//判断日期分表查询
List<String> monthsDate = new ArrayList<>();
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
Calendar startCalendar = Calendar.getInstance();
Calendar endCalendar = Calendar.getInstance();

try {
    startCalendar.setTime(sdf.parse(startTime));
    endCalendar.setTime(sdf.parse(endTime));
} catch (Exception e) {
    e.printStackTrace();
}

while (!startCalendar.after(endCalendar)) {
    String year = String.valueOf(startCalendar.get(Calendar.YEAR));
    String month = String.format("%02d", startCalendar.get(Calendar.MONTH) + 1);
    monthsDate.add(year + month);
    startCalendar.add(Calendar.MONTH, 1);
}
log.info("统计日期数据库维度根据时间去查询的表名为==============>{}", monthsDate);
```

当我时间为 2024-09-01 至 2024-11-01 时，输出结果：

统计日期数据库维度根据时间去查询的表名为 [202409, 202410, 202411]

## 文件流操作

### 验证表头是否符合预期

```Java
// 读取工作簿
Workbook workBook = WorkbookFactory.create(file.getInputStream());
// 读取工作表
Sheet sheet = workBook.getSheetAt(0);

// 验证表头是否符合预期
Row titleRow = sheet.getRow(4);
if (!isValidTemplate(titleRow)) {
    return error(new ErrorCode(1_002_000_003, "Excel表格的表头不正确"));
}
```

isValidTemplate() 方法

```java
private boolean isValidTemplate(Row titleRow) {
    if (titleRow == null) return false;

    List<String> requiredHeaders = new ArrayList<>();
    Field[] fields = PlaneTicketReimburseSaveReqVO.class.getDeclaredFields();

    for (Field field : fields) {
        Schema schema = field.getAnnotation(Schema.class);
        if (schema != null && !field.isAnnotationPresent(ExcelIgnore.class)) {
            requiredHeaders.add(schema.description());
        }
    }

    log.info("Excel表头-->{}",requiredHeaders);

    for (String header : requiredHeaders) {
        boolean found = false;
        for (Cell cell : titleRow) {
            if (cell.getCellType() == CellType.STRING && cell.getStringCellValue().equals(header)) {
                found = true;
                break;
            }
        }
        if (!found) return false;
    }
    return true;
}
```

## Apifox

### @RequestBody

@RequestBody：自动导入生成注解

![image-20241115141443645](https://y.creammint.cn/articles/images/image-20241115141443645.png)

## 接口对接

[java 后端对接外部系统（HttpClient HttpPost）\_java 做接口给外部系统调用](https://blog.csdn.net/zhanghengchao123/article/details/122369863)

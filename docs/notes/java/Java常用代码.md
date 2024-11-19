# Java 常用代码

## 获取月份集合

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

## Apifox

### @RequestBody

@RequestBody：自动导入生成注解

![image-20241115141443645](https://y.creammint.cn/articles/images/image-20241115141443645.png)

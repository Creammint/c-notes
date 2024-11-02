# Oracle 存储过程语句

## 循环执行过程

### 按天

```sql
DECLARE
  start_date DATE := TO_DATE('2024-08-01', 'YYYY-MM-DD');
  end_date   DATE := TO_DATE('2024-08-31', 'YYYY-MM-DD');
  current_date DATE;
BEGIN
  current_date := start_date;
  WHILE current_date <= end_date LOOP
     proc_creammint_test(current_date);
    current_date := current_date + 1; -- 增加一天
  END LOOP;
END;
```

### 按周

```sql
DECLARE
  start_date DATE := TO_DATE('2024-01-01', 'YYYY-MM-DD'); -- 这里应该是开始日期
  end_date   DATE := TO_DATE('2024-01-07', 'YYYY-MM-DD'); -- 这里应该是结束日期
  current_date DATE;
  days_offset NUMBER;
BEGIN
  current_date := start_date;
  WHILE current_date < end_date LOOP
    -- 计算当前日期到本周周一的偏移量
    days_offset := CASE WHEN TO_CHAR(current_date, 'D') < '4' THEN TO_NUMBER(TO_CHAR(current_date, 'D')) - 1 ELSE 7 - TO_NUMBER(TO_CHAR(current_date, 'D')) END;
    -- 调整到本周的周一
    current_date := current_date - days_offset;
    -- 计算本周的周日
    current_date := current_date + 6;
    -- 调用存储过程
    proc_creammint_test(current_date);
    -- 移动到下一周的周一
    current_date := current_date + 1;
  END LOOP;
  -- 处理最后一周的情况，如果end_date是周日
  IF TO_NUMBER(TO_CHAR(end_date, 'D')) = 7 THEN -- 7代表周日
    proc_bi_onliensale_store_week(end_date);
    proc_bi_onliensale_goods_week(end_date);
  END IF;
END;
```

### 按月

```sql
DECLARE
  start_date DATE := TO_DATE('2024-03-31', 'YYYY-MM-DD'); -- 这里应该是开始日期所在月份的最后一天
  end_date   DATE := TO_DATE('2024-08-31', 'YYYY-MM-DD'); -- 这里应该是结束日期所在月份的最后一天
  current_date DATE;
BEGIN
  current_date := start_date;
  WHILE current_date <= end_date LOOP
    -- 找到当前月份的最后一天
    current_date := LAST_DAY(current_date);
    -- 调用存储过程
    proc_creammint_month(current_date);
    -- 移动到下一个月的第一天，然后再次调用LAST_DAY找到下一个月的最后一天
    current_date := ADD_MONTHS(current_date, 1);
    current_date := LAST_DAY(current_date);
  END LOOP;
END;
```

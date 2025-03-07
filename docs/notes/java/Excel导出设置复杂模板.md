# Excel 导出设置复杂模板

## 前言

复杂的 Excel 模板导出，例如：设置单元格背景色，合并单元格之类；

## pom.xml

```xml
<!-- POI Excel-->
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.2.3</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.3</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml-schemas</artifactId>
    <version>4.1.2</version>
</dependency>
```

## 工具类

### ExcelMergeUtil

```java
package cn.iocoder.yudao.module.bpm.util;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.write.style.HeadFontStyle;
import com.alibaba.excel.annotation.write.style.HeadStyle;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFPicture;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class ExcelMergeUtil {
    private Workbook workbook;
    private Sheet sheet;
    private int currentRow = 0;
    private int totalColumns;
    private List<Integer> columnWidths;
    private Map<String, CellStyle> styles = new HashMap<>();

    public ExcelMergeUtil() {
        this.workbook = new XSSFWorkbook();
        this.sheet = workbook.createSheet("Sheet1");
        initDefaultStyles();
    }

    public Workbook getWorkbook() {
        return this.workbook;
    }

    // 初始化默认样式
    private void initDefaultStyles() {
        // 标题样式
        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerFont.setFontHeightInPoints((short) 14);
        headerStyle.setFont(headerFont);

        // 设置边框
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);

        styles.put("header", headerStyle);

        // 普通文本样式
        CellStyle normalStyle = workbook.createCellStyle();
        normalStyle.setAlignment(HorizontalAlignment.LEFT);
        normalStyle.setWrapText(true);

        // 设置边框
        normalStyle.setBorderTop(BorderStyle.THIN);
        normalStyle.setBorderBottom(BorderStyle.THIN);
        normalStyle.setBorderLeft(BorderStyle.THIN);
        normalStyle.setBorderRight(BorderStyle.THIN);

        styles.put("normal", normalStyle);
    }

    /**
     * 配置表格列
     *
     * @param widths 列宽列表（字符数）
     */
    public void configureColumns(List<Integer> widths) {
        this.totalColumns = widths.size();
        this.columnWidths = new ArrayList<>(widths);
        for (int i = 0; i < widths.size(); i++) {
            sheet.setColumnWidth(i, widths.get(i) * 256);
        }
    }

    /**
     * 添加数据行
     *
     * @param rowData 行数据配置
     */
    public void addRow(RowData rowData) throws IOException {
        Row row = sheet.createRow(currentRow);
        int colIndex = 0;

        // 处理合并单元格
        if (rowData.getMerges() != null) {
            for (CellMergeConfig merge : rowData.getMerges()) {
                // 检查合并区域是否重叠
                if (!isMergeRegionOverlapped(merge.getStartRow(), merge.getEndRow(),
                        merge.getStartColumn(), merge.getEndColumn())) {
                    CellRangeAddress range = new CellRangeAddress(
                            merge.getStartRow(), // 起始行
                            merge.getEndRow(),   // 结束行
                            merge.getStartColumn(), // 起始列
                            merge.getEndColumn()   // 结束列
                    );
                    sheet.addMergedRegion(range);
                } else {
                    log.warn("与其他行合并区域重叠: rows {}-{}, columns {}-{}",
                            merge.getStartRow(), merge.getEndRow(),
                            merge.getStartColumn(), merge.getEndColumn());
                }
            }
        }

        // 填充单元格数据
        for (CellConfig cellConfig : rowData.getCells()) {
            Cell cell = row.createCell(colIndex);
            cell.setCellValue(cellConfig.getValue());

            // 应用样式
            CellStyle style = getCellStyle(
                    cellConfig.getFontColor(),
                    cellConfig.getBackgroundColor(),
                    cellConfig.getAlignment()
            );
            if (rowData.isWrapText()) {
                style.setWrapText(true); // 启用自动换行
            }
            cell.setCellStyle(style);

            // 检查是否有图片需要插入
            String imagePath = rowData.getImagePaths().get(cellConfig);
            if (imagePath != null) {
                insertImage(imagePath, currentRow, colIndex);
            }

            // 处理列跨度
            colIndex += cellConfig.getColSpan();
        }

        // 设置列宽
        if (rowData.getColumnWidths() != null) {
            for (Map.Entry<Integer, Integer> entry : rowData.getColumnWidths().entrySet()) {
                sheet.setColumnWidth(entry.getKey(), entry.getValue() * 256);
            }
        }

        // 设置行高
        if (rowData.getRowHeight() != null) {
            row.setHeight((short) (rowData.getRowHeight() * 20)); // 转换为 twip
        }

        // 应用加粗样式
        if (rowData.getBoldCells() != null && rowData.getBoldCells().containsKey(currentRow)) {
            Map<Integer, Boolean> boldCellsInRow = rowData.getBoldCells().get(currentRow);
            for (Map.Entry<Integer, Boolean> entry : boldCellsInRow.entrySet()) {
                int columnIndex = entry.getKey();
                boolean isBold = entry.getValue();
                setCellBold(currentRow, columnIndex, isBold); // 只修改指定单元格
            }
        }

        // 应用字体大小
        if (rowData.getFontSizes() != null && rowData.getFontSizes().containsKey(currentRow)) {
            Map<Integer, Short> fontSizesInRow = rowData.getFontSizes().get(currentRow);
            for (Map.Entry<Integer, Short> entry : fontSizesInRow.entrySet()) {
                int columnIndex = entry.getKey();
                short fontSize = entry.getValue();
                setCellFontSize(currentRow, columnIndex, fontSize); // 设置字体大小
            }
        }

        currentRow++;
    }

    /**
     * 插入图片
     *
     * @param imagePath   图片路径
     * @param rowIndex    行索引
     * @param columnIndex 列索引
     */
    public void insertImage(String imagePath, int rowIndex, int columnIndex) throws IOException {
        FileInputStream imageStream = new FileInputStream(imagePath);
        byte[] bytes = imageStream.readAllBytes();
        int pictureIdx = workbook.addPicture(bytes, Workbook.PICTURE_TYPE_PNG);
        imageStream.close();

        XSSFDrawing drawing = (XSSFDrawing) sheet.createDrawingPatriarch();

        // 获取当前列的宽度和行的高度
        int columnWidth = columnWidths.get(columnIndex); // 列宽（字符数）
        int rowHeight = getRowHeight(rowIndex); // 行高（微像素）

        // 计算图片的目标宽度和高度
        double targetWidth = columnWidth * 256; // 转换为微像素
        double targetHeight = rowHeight * 0.6; // 图片高度占行高的 60%

        // 创建 XSSFClientAnchor
        XSSFClientAnchor anchor = new XSSFClientAnchor(
                (int) (0), // 起始列偏移量
                (int) (0), // 起始行偏移量
                (int) (targetWidth), // 结束列偏移量
                (int) (targetHeight), // 结束行偏移量
                columnIndex, // 起始列
                rowIndex, // 起始行
                columnIndex + 1, // 结束列
                rowIndex + 1 // 结束行
        );

        // 创建图片并调整大小
        XSSFPicture picture = drawing.createPicture(anchor, pictureIdx);
        picture.resize(targetWidth / (anchor.getDx2() - anchor.getDx1()), targetHeight / (anchor.getDy2() - anchor.getDy1()));
    }

    public int getRowHeight(int rowIndex) {
        Row row = sheet.getRow(rowIndex);
        if (row != null) {
            return row.getHeight(); // 获取行高（单位为 twip，1/20 磅）
        } else {
            return sheet.getDefaultRowHeight(); // 使用默认行高
        }
    }

    /**
     * 获取单元格样式
     *
     * @param fontColor       字体颜色
     * @param backgroundColor 背景颜色
     * @param alignment       文字对齐方式
     * @return 单元格样式
     */
    private CellStyle getCellStyle(Short fontColor, Short backgroundColor, HorizontalAlignment alignment) {
        // 设置默认值
        fontColor = (fontColor == null) ? IndexedColors.BLACK.getIndex() : fontColor;
        backgroundColor = (backgroundColor == null) ? IndexedColors.WHITE.getIndex() : backgroundColor;
        alignment = (alignment == null) ? HorizontalAlignment.LEFT : alignment; // 提供默认值

        String key = fontColor + "," + backgroundColor + "," + alignment.toString();
        if (styles.containsKey(key)) {
            return styles.get(key);
        }

        CellStyle style = workbook.createCellStyle();
        style.setFont(createFont(fontColor));
        style.setFillForegroundColor(backgroundColor);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(alignment);

        // 设置边框
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);

        // 设置垂直对齐方式
        style.setVerticalAlignment(VerticalAlignment.CENTER);

        styles.put(key, style);
        return style;
    }

    /**
     * 创建字体
     *
     * @param color 字体颜色
     * @return 字体
     */
    private Font createFont(short color) {
        Font font = workbook.createFont();
        font.setColor(color);
        return font;
    }

    /**
     * 导出Excel文件
     *
     * @param filename 输出文件名
     */
    public void export(String filename) throws IOException {
        try (FileOutputStream fos = new FileOutputStream(filename)) {
            // 验证文件生成
            File output = new File(filename);
            log.info("文件名: {}", filename);
            log.info("文件是否存在: {}", output.exists());
            log.info("文件大小: {} bytes", output.length());
            workbook.write(fos);
        }
        workbook.close();
    }

    /**
     * 生成 Excel 并返回 ByteArrayOutputStream
     */
    public ByteArrayOutputStream exportToStream() throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        workbook.close();
        return bos;
    }

    // 数据行配置类
    public static class RowData {
        private List<CellConfig> cells = new ArrayList<>();
        private List<CellMergeConfig> merges = new ArrayList<>();
        private Map<CellConfig, String> imagePaths = new HashMap<>();
        private Map<Integer, Integer> columnWidths = new HashMap<>();
        private Integer rowHeight;
        private boolean wrapText = false;
        private Map<Integer, Map<Integer, Boolean>> boldCells = new HashMap<>();
        private Map<Integer, Map<Integer, Short>> fontSizes = new HashMap<>();
        private Map<Integer, Map<Integer, CellStyle>> cellStyles = new HashMap<>(); // 新增：存储单元格样式
        public RowData addCell(String value, int colSpan, Short fontColor, Short backgroundColor, HorizontalAlignment alignment) {
            CellConfig cell = new CellConfig(value, colSpan, fontColor, backgroundColor, alignment);
            cells.add(cell);
            return this;
        }

        public RowData addMerge(int startRow, int endRow, int startColumn, int endColumn) {
            merges.add(new CellMergeConfig(startRow, endRow, startColumn, endColumn));
            return this;
        }

        public RowData addImage(int columnIndex, String imagePath) {
            if (cells.isEmpty()) {
                cells.add(new CellConfig(" ", 1, null, null, null));
            }
            if (columnIndex < 0 || columnIndex >= cells.size()) {
                throw new IndexOutOfBoundsException("Column index out of bounds");
            }
            imagePaths.put(cells.get(columnIndex), imagePath);
            return this;
        }

        // 新增：支持传入 CellStyle 的 addCell 方法
        public RowData addCell(String value, int colSpan, Short fontColor, Short backgroundColor, HorizontalAlignment alignment, CellStyle style,Integer hearCurrentRow) {
            CellConfig cell = new CellConfig(value, colSpan, fontColor, backgroundColor, alignment);
            cells.add(cell);
            if (style != null) {
                if (!cellStyles.containsKey(hearCurrentRow)) {
                    cellStyles.put(hearCurrentRow, new HashMap<>());
                }
                cellStyles.get(hearCurrentRow).put(cells.size() - 1, style);
            }
            return this;
        }

        // 新增：获取单元格样式的方法
        public CellStyle getCellStyle(int rowIndex, int columnIndex) {
            if (cellStyles.containsKey(rowIndex) && cellStyles.get(rowIndex).containsKey(columnIndex)) {
                return cellStyles.get(rowIndex).get(columnIndex);
            }
            return null;
        }

        public RowData setColumnWidth(int columnIndex, int width) {
            columnWidths.put(columnIndex, width);
            return this;
        }

        public RowData setRowHeight(int height) {
            this.rowHeight = height;
            return this;
        }

        public RowData setWrapText(boolean wrapText) {
            this.wrapText = wrapText;
            return this;
        }

        /**
         * 设置特定单元格的字体加粗
         *
         * @param rowIndex    行索引
         * @param columnIndex 列索引
         * @param isBold      是否加粗
         */
        public RowData setCellBold(int rowIndex, int columnIndex, boolean isBold) {
            if (!boldCells.containsKey(rowIndex)) {
                boldCells.put(rowIndex, new HashMap<>());
            }
            boldCells.get(rowIndex).put(columnIndex, isBold);
            return this;
        }

        public Map<Integer, Map<Integer, Boolean>> getBoldCells() {
            return boldCells;
        }

        /**
         * 设置特定单元格的字体大小
         *
         * @param rowIndex    行索引
         * @param columnIndex 列索引
         * @param fontSize    字体大小（单位：磅）
         */
        public RowData setCellFontSize(int rowIndex, int columnIndex, short fontSize) {
            if (!fontSizes.containsKey(rowIndex)) {
                fontSizes.put(rowIndex, new HashMap<>());
            }
            fontSizes.get(rowIndex).put(columnIndex, fontSize);
            return this;
        }

        public Map<Integer, Map<Integer, Short>> getFontSizes() {
            return fontSizes;
        }

        public List<CellConfig> getCells() {
            return cells;
        }

        public List<CellMergeConfig> getMerges() {
            return merges;
        }

        public Map<CellConfig, String> getImagePaths() {
            return imagePaths;
        }

        public Map<Integer, Integer> getColumnWidths() {
            return columnWidths;
        }

        public Integer getRowHeight() {
            return rowHeight;
        }

        public boolean isWrapText() {
            return wrapText;
        }
    }

    // 单元格配置类
    public static class CellConfig {
        private String value;
        private int colSpan;
        private Short fontColor;
        private Short backgroundColor;
        private HorizontalAlignment alignment;

        public CellConfig(String value, int colSpan, Short fontColor, Short backgroundColor, HorizontalAlignment alignment) {
            this.value = value;
            this.colSpan = colSpan;
            this.fontColor = fontColor;
            this.backgroundColor = backgroundColor;
            this.alignment = alignment;
        }

        public String getValue() {
            return value;
        }

        public int getColSpan() {
            return colSpan;
        }

        public Short getFontColor() {
            return fontColor;
        }

        public Short getBackgroundColor() {
            return backgroundColor;
        }

        public HorizontalAlignment getAlignment() {
            return alignment;
        }
    }

    // 合并配置类
    public static class CellMergeConfig {
        private int startRow;
        private int endRow;
        private int startColumn;
        private int endColumn;

        public CellMergeConfig(int startRow, int endRow, int startColumn, int endColumn) {
            this.startRow = startRow;
            this.endRow = endRow;
            this.startColumn = startColumn;
            this.endColumn = endColumn;
        }

        public int getStartRow() {
            return startRow;
        }

        public int getEndRow() {
            return endRow;
        }

        public int getStartColumn() {
            return startColumn;
        }

        public int getEndColumn() {
            return endColumn;
        }
    }

    /**
     * 添加空白单元格
     *
     * @param rowData    行数据对象
     * @param count      空白单元格数量
     * @param fontColor  字体颜色
     * @param bgColor    背景颜色
     * @param alignment  对齐方式
     */
    public void addBlankCells(RowData rowData, int count, Short fontColor, Short bgColor, HorizontalAlignment alignment) {
        for (int i = 0; i < count; i++) {
            rowData.addCell("", 1, fontColor, bgColor, alignment);
        }
    }

    /**
     * 添加空白单元格（使用默认样式）
     *
     * @param rowData 行数据对象
     * @param count   空白单元格数量
     */
    public void addBlankCells(RowData rowData, int count) {
        addBlankCells(rowData, count, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.CENTER);
    }

    /**
     * 设置特定单元格的字体加粗
     *
     * @param rowIndex    行索引
     * @param columnIndex 列索引
     * @param isBold      是否加粗
     */
    public void setCellBold(int rowIndex, int columnIndex, boolean isBold) {
        Row row = sheet.getRow(rowIndex);
        if (row == null) {
            row = sheet.createRow(rowIndex);
        }
        Cell cell = row.getCell(columnIndex);
        if (cell == null) {
            cell = row.createCell(columnIndex);
        }

        // 创建新的 CellStyle，避免样式复用
        CellStyle newStyle = workbook.createCellStyle();
        CellStyle oldStyle = cell.getCellStyle();
        if (oldStyle != null) {
            newStyle.cloneStyleFrom(oldStyle); // 复制原有样式
        }

        // 创建新的字体并设置加粗
        Font font = workbook.createFont();
        font.setBold(isBold);
        newStyle.setFont(font);

        // 应用新样式
        cell.setCellStyle(newStyle);
    }

    /**
     * 设置特定单元格的字体大小
     *
     * @param rowIndex    行索引
     * @param columnIndex 列索引
     * @param fontSize    字体大小（单位：磅）
     */
    public void setCellFontSize(int rowIndex, int columnIndex, short fontSize) {
        Row row = sheet.getRow(rowIndex);
        if (row == null) {
            row = sheet.createRow(rowIndex);
        }
        Cell cell = row.getCell(columnIndex);
        if (cell == null) {
            cell = row.createCell(columnIndex);
        }

        // 创建新的 CellStyle，避免样式复用
        CellStyle newStyle = workbook.createCellStyle();
        CellStyle oldStyle = cell.getCellStyle();
        if (oldStyle != null) {
            newStyle.cloneStyleFrom(oldStyle); // 复制原有样式
        }

        // 创建新的字体并设置字体大小
        Font font = workbook.createFont();
        font.setFontHeightInPoints(fontSize);
        newStyle.setFont(font);

        // 应用新样式
        cell.setCellStyle(newStyle);
    }

    public static ExcelMergeUtil.RowData buildHeaderRow(Class<?> clazz, Workbook workbook,Integer hearCurrentRow) {
        ExcelMergeUtil.RowData headerRow = new ExcelMergeUtil.RowData();

        // 获取实体类的字段
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            // 获取字段上的 @ExcelProperty 注解
            ExcelProperty excelProperty = field.getAnnotation(ExcelProperty.class);
            if (excelProperty != null) {
                String headerName = excelProperty.value()[0]; // 获取表头名称

                // 获取字段上的 @HeadStyle 和 @HeadFontStyle 注解
                HeadStyle headStyle = field.getAnnotation(HeadStyle.class);
                HeadFontStyle headFontStyle = field.getAnnotation(HeadFontStyle.class);

                // 创建单元格样式
                CellStyle style = workbook.createCellStyle();
                if (headStyle != null) {
                    // 设置背景色
                    style.setFillForegroundColor((short) headStyle.fillForegroundColor());
                    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
                }
                if (headFontStyle != null) {
                    // 设置字体
                    Font font = workbook.createFont();
                    font.setFontName(headFontStyle.fontName());
                    font.setFontHeightInPoints(headFontStyle.fontHeightInPoints());
                    style.setFont(font);
                }

                // 设置对齐方式
                style.setAlignment(HorizontalAlignment.CENTER);
                style.setVerticalAlignment(VerticalAlignment.CENTER);

                // 添加表头单元格，并传入样式
                headerRow.addCell(headerName, 1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.CENTER, style,hearCurrentRow);
            }
        }

        // 设置表头行高
        headerRow.setRowHeight(20);

        return headerRow;
    }

    /**
     * 获取当前行号
     *
     * @return 当前行号
     */
    public int getCurrentRow() {
        return this.currentRow;
    }

    private boolean isMergeRegionOverlapped(int startRow, int endRow, int startColumn, int endColumn) {
        for (CellRangeAddress existingRegion : sheet.getMergedRegions()) {
            if (existingRegion.getFirstRow() <= endRow &&
                    existingRegion.getLastRow() >= startRow &&
                    existingRegion.getFirstColumn() <= endColumn &&
                    existingRegion.getLastColumn() >= startColumn) {
                return true; // 存在重叠
            }
        }
        return false; // 无重叠
    }
}

```

### MergedColumnConfig

```java
package cn.iocoder.yudao.module.bpm.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MergedColumnConfig {
    private int fromRow; // 起始行号（0-based）
    private int toRow; // 结束行号（0-based）
    private int startCol; // 起始列号（0-based）
    private int endCol; // 结束列号（0-based）
}
```

## 业务代码

### 实体类

```java
public class VdragmtadjDetailsExportExcel {
    @Schema(description = "行号")
    @ExcelProperty("行号")
    private Long line;

    @Schema(description = "大类名称")
    @ExcelProperty("大类名称")
    private String largeCategoryName;
}
```

### Controller

```java
@GetMapping("/export-excel")
@ApiAccessLog(operateType = EXPORT)
public void exportVdragmtadjDetailsExcel(@Valid VdragmtadjDetailsPageReqVO pageReqVO,
                                         HttpServletResponse response) throws IOException {
    vdragmtadjDetailsService.exportVdragmtadjDetails(response,pageReqVO);
}

```

### Service

#### 汇总部分

```java
@Override
public void exportVdragmtadjDetails(HttpServletResponse response, VdragmtadjDetailsPageReqVO pageReqVO) throws IOException {
	// 获取单头部分
	LambdaQueryWrapper<VdragmtadjDO> wrapper = new LambdaQueryWrapper<>();
	VdragmtadjDO vdragmtadjDO = vdragmtadjMapper.selectOne(wrapper.eq(VdragmtadjDO::getNum, pageReqVO.getNum()));
	if (Objects.isNull(vdragmtadjDO)) {
		return;
	}
	// 压缩包内文件路径
	List<String> zipFileNameList = new ArrayList<>();
	// 压缩包内文件输入流
	List<InputStream> zipInputStreamList = new ArrayList<>();

	// 商品明细部分
	LambdaQueryWrapper<VdragmtadjDetailsDO> wrapperDtl = new LambdaQueryWrapper<>();
	List<VdragmtadjDetailsDO> vdragmtadjDetailsDOList = vdragmtadjDetailsMapper.selectList(wrapperDtl.eq(VdragmtadjDetailsDO::getNum, pageReqVO.getNum()));
	vdragmtadjDO.setVdragmtadjDetailsDOList(vdragmtadjDetailsDOList);

	// 设置Excel格式
	ByteArrayOutputStream excelOutputStream = this.buildExportExcelTemplate(vdragmtadjDO);

	// 将Excel添加进Zip
	zipFileNameList.add("采购贸易协议.xlsx");
	zipInputStreamList.add(IoUtil.toStream(excelOutputStream));
	// Excel转pdf
	ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();
	try {
		ExcelToPdfUtil.excelToPdf(IoUtil.toStream(excelOutputStream), pdfOutputStream, ".xlsx");
		zipFileNameList.add("采购贸易协议.pdf");
		zipInputStreamList.add(IoUtil.toStream(pdfOutputStream));
	} catch (Exception e) {
		e.printStackTrace();
	}

	// 将附件从OSS中下载并放入压缩包内，附件会临时放在内存，注意附件大小
	String attachmentDetail = vdragmtadjDO.getAttachment();
	if (StrUtil.isNotBlank(attachmentDetail)) {
		List<BpmOASupplierPBRequest.AttachmentDetail> detailList = JSON.parseArray(attachmentDetail).toJavaList(BpmOASupplierPBRequest.AttachmentDetail.class);
		for (BpmOASupplierPBRequest.AttachmentDetail detail : detailList) {
			String attachmentName = detail.getName();
			String attachmentUrl = detail.getUrl();
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			HttpUtil.download(attachmentUrl, outputStream, true);
			zipFileNameList.add(attachmentName);
			zipInputStreamList.add(IoUtil.toStream(outputStream));
		}
	}
	ZipUtil.zip(response.getOutputStream(),
			ArrayUtil.toArray(zipFileNameList, String.class),
			ArrayUtil.toArray(zipInputStreamList, InputStream.class));
}
```

#### 设置 Excel 模板

```java
public ByteArrayOutputStream buildExportExcelTemplate(VdragmtadjDO vdragmtadjDO) throws Exception{
        List<VdragmtadjDetailsDO> vdragmtadjDetailsDOList = vdragmtadjDO.getVdragmtadjDetailsDOList();


        ExcelMergeUtil exporter = new ExcelMergeUtil();

        //=======================添加第一行标题=======================
        ExcelMergeUtil.RowData rowData1 = new ExcelMergeUtil.RowData();
        exporter.addRow(
                rowData1.addCell("采购贸易协议", 1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.CENTER)
                .addMerge(0, 0, 0, 31)
                // 设置行高
                .setRowHeight(20)
                // 字体加粗
                .setCellBold(0,0,true)
                // 设置字体大小
                .setCellFontSize(0, 0, (short) 16)
                // 设置单元格宽度
                .setColumnWidth(0, 5)
                .setColumnWidth(1, 8)
        );

        //=======================添加第二行数据=======================
        LocalDateTime fileDate = vdragmtadjDO.getFildate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日");
        String formattedDate = fileDate.format(formatter);
        // 是否首次合作
        String ifFirstCooperate;
        if(vdragmtadjDO.getFirstCooperate()==1){
            ifFirstCooperate = "是";
        }else {
            ifFirstCooperate = "否";
        }
        ExcelMergeUtil.RowData rowData2 = new ExcelMergeUtil.RowData()
                .addCell("时间：", 1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.CENTER)
                .addCell("", 1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.CENTER);
        rowData2.addCell(safeString(formattedDate),1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.LEFT);
        // 添加 12 个空白单元格
        exporter.addBlankCells(rowData2, 11);
        rowData2.addCell("是否首次合作：", 1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.CENTER);
        // 添加 2 个空白单元格
        exporter.addBlankCells(rowData2, 2);
        rowData2.addCell(ifFirstCooperate,1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.LEFT);
        // 添加 2 个空白单元格
        exporter.addBlankCells(rowData2, 2);
        rowData2.addCell("采购贸易协议编号：", 1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.CENTER)
                .addCell("", 1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.CENTER);
        rowData2.addCell(vdragmtadjDO.getNum(),1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.LEFT);
        // 添加 9 个空白单元格
        exporter.addBlankCells(rowData2, 9);
        rowData2.addMerge(1, 1, 0, 1)
               .addMerge(1, 1, 2, 13)
               .addMerge(1, 1, 14, 16)
               .addMerge(1, 1, 17, 19)
               .addMerge(1, 1, 20, 21)
               .addMerge(1, 1, 22, 31)
                // 字体加粗
                .setCellBold(17,19,true)
                // 设置行高
               .setRowHeight(15)
               .setWrapText(true);
        exporter.addRow(rowData2);

    	//=======================添加数据行=======================
        //添加表头
        ExcelMergeUtil.RowData headerRow = ExcelMergeUtil.buildHeaderRow(VdragmtadjDetailsExportExcel.class, exporter.getWorkbook(),exporter.getCurrentRow());
        headerRow.setRowHeight(50);
        exporter.addRow(headerRow);

        // 添加明细数据
        if (vdragmtadjDetailsDOList != null && !vdragmtadjDetailsDOList.isEmpty()) {
            for (VdragmtadjDetailsDO detail : vdragmtadjDetailsDOList) {
                // 将 VdragmtadjDetailsDO 转换为 VdragmtadjDetailsExportExcel
                VdragmtadjDetailsExportExcel exportExcel = BeanUtils.toBean(detail, VdragmtadjDetailsExportExcel.class);

                // 构建数据行
                ExcelMergeUtil.RowData dataRow = new ExcelMergeUtil.RowData()
                        .addCell(String.valueOf(exportExcel.getLine()), 1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.CENTER)
                        .addCell(exportExcel.getLargeCategoryName(), 1, IndexedColors.BLACK.getIndex(), IndexedColors.WHITE.getIndex(), HorizontalAlignment.LEFT)
                        .setRowHeight(40)
                        .setWrapText(true);
                exporter.addRow(dataRow);
            }
        }
}
```

这里需要注意，合并单元格的时候，需要添加`空白单元格`，不然会把数据覆盖掉；

```java
exporter.addBlankCells(rowData2, 1) // 1代表添加1个空白单元格

rowData2.addMerge(1, 1, 0, 1) //合并单元格 第1行，0-1列
```

## 压缩包 zip

```java
// 压缩包内文件路径
List<String> zipFileNameList = new ArrayList<>();
// 压缩包内文件输入流
List<InputStream> zipInputStreamList = new ArrayList<>();

// 商品明细部分
LambdaQueryWrapper<VdragmtadjDetailsDO> wrapperDtl = new LambdaQueryWrapper<>();
List<VdragmtadjDetailsDO> vdragmtadjDetailsDOList = vdragmtadjDetailsMapper.selectList(wrapperDtl.eq(VdragmtadjDetailsDO::getNum, pageReqVO.getNum()));
vdragmtadjDO.setVdragmtadjDetailsDOList(vdragmtadjDetailsDOList);

// 设置Excel格式
ByteArrayOutputStream excelOutputStream = this.buildExportExcelTemplate(vdragmtadjDO);

// 将Excel添加进Zip
zipFileNameList.add("采购贸易协议.xlsx");
zipInputStreamList.add(IoUtil.toStream(excelOutputStream));

// 将附件从OSS中下载并放入压缩包内，附件会临时放在内存，注意附件大小
String attachmentDetail = vdragmtadjDO.getAttachment();
if (StrUtil.isNotBlank(attachmentDetail)) {
    List<BpmOASupplierPBRequest.AttachmentDetail> detailList = JSON.parseArray(attachmentDetail).toJavaList(BpmOASupplierPBRequest.AttachmentDetail.class);
    for (BpmOASupplierPBRequest.AttachmentDetail detail : detailList) {
        String attachmentName = detail.getName();
        String attachmentUrl = detail.getUrl();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        HttpUtil.download(attachmentUrl, outputStream, true);
        zipFileNameList.add(attachmentName);
        zipInputStreamList.add(IoUtil.toStream(outputStream));
    }
}

// 添加到压缩包中
ZipUtil.zip(response.getOutputStream(),
            ArrayUtil.toArray(zipFileNameList, String.class),
            ArrayUtil.toArray(zipInputStreamList, InputStream.class));
```

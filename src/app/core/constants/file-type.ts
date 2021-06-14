import { Amber, Blue, BlueGray, Green, Orange, Red, Teal, Violet, Rose } from '../enum/colors.enum';

export const FileType: any = {
  csv: 'excel',
  xls: 'excel',
  xlsb: 'excel',
  xlsm: 'excel',
  xlsx: 'excel',
  ods: 'excel',
  doc: 'word',
  docm: 'word',
  docx: 'word',
  odt: 'word',
  ppt: 'ppt',
  pptm: 'ppt',
  pptx: 'ppt',
  odp: 'ppt',
  pdf: 'pdf',
  gif: 'gif',
  png: 'image',
  bmp: 'image',
  tif: 'image',
  svg: 'image',
  jpg: 'jpg',
  jpeg: 'jpg',
  txt: 'text',
  xml: 'text',
  zip: 'zip',
  rar: 'zip',
  '7z': 'zip'
};

export const FileTypeColor: any = {
  excel: Green._500,
  word: Blue._500,
  ppt: Orange._500,
  pdf: Red._500,
  gif: Teal._500,
  image: Rose._400,
  jpg: Violet._500,
  text: BlueGray._400,
  zip: Amber._500,
  unknown: Blue._800
};

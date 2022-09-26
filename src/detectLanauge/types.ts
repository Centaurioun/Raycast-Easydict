/*
 * @author: tisfeng
 * @createTime: 2022-08-12 18:38
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-09-19 11:35
 * @fileName: types.ts
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { QueryResponse } from "../types";

export enum LanguageDetectType {
  Simple = "Simple Detect",
  Franc = "Franc Detect",
  Apple = "Apple Detect",
  Tencent = "Tencent Detect",
  Baidu = "Baidu Detect",
  Google = "Google Detect",
  Bing = "Bing Detect",
  Volcano = "Volcano Detect",
}

export interface DetectedLanguageModel {
  type: LanguageDetectType;
  youdaoLanguageId: string; // pl
  sourceLanguageId: string; // eg. apple detect 波兰语
  confirmed: boolean;
  detectedLanguageArray?: [string, number][]; // [['ita', 1], ['fra', 0.6]]
  result?: QueryResponse;
}

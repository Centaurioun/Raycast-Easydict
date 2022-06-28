/*
 * @author: tisfeng
 * @createTime: 2022-06-24 22:36
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-06-28 20:16
 * @fileName: consts.ts
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { LanguageDetectType } from "./detectLanguage";
import { LanguageItem, RequestErrorInfo } from "./types";

export const clipboardQueryTextKey = "clipboardQueryTextKey";

/**
 * 百度翻译 query 长度限制：为保证翻译质量，请将单次请求长度控制在 6000 bytes以内（汉字约为输入参数 2000 个）
 */
export const maxInputTextLength = 2000;

export enum SectionType {
  Translation = "Translate",
  Explanations = "Explanation",
  Forms = "Forms and Tenses",
  WebTranslation = "Web Translation",
  WebPhrase = "Web Phrase",
}

export enum TranslateType {
  Youdao = "Youdao",
  Baidu = "Baidu",
  Tencent = "Tencent",
  Caiyun = "Caiyun",
  Apple = "Apple",
}

export enum DicionaryType {
  Youdao = "Youdao Dictionary",
  Iciba = "Iciba Dictionary",
}

export type RequestType = TranslateType | DicionaryType | LanguageDetectType;

export enum YoudaoRequestStateCode {
  Success = "0",
  AccessFrequencyLimited = "207",
  InsufficientAccountBalance = "401",
  TargetLanguageNotSupported = "102",
  TranslationQueryFailed = "302", // 翻译查询失败, such as 'con' 😓
}

// https://fanyi-api.baidu.com/doc/21
export enum BaiduRequestStateCode {
  Success = "52000",
  AccessFrequencyLimited = "54003",
  InsufficientAccountBalance = "54004",
  TargetLanguageNotSupported = "58001",
}

export const youdaoErrorCodeUrl = encodeURI(
  "https://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html#section-11"
);

export const youdaoErrorList: RequestErrorInfo[] = [
  {
    code: YoudaoRequestStateCode.Success,
    message: "Success",
  },
  {
    code: YoudaoRequestStateCode.AccessFrequencyLimited,
    message: "Access frequency limited",
  },
  {
    code: YoudaoRequestStateCode.InsufficientAccountBalance,
    message: "Insufficient account balance",
  },
  {
    code: YoudaoRequestStateCode.TargetLanguageNotSupported,
    message: "Target language not supported",
  },
  {
    code: YoudaoRequestStateCode.TranslationQueryFailed,
    message: "Translation query failed",
  },
];

export function getYoudaoErrorInfo(errorCode: string): RequestErrorInfo {
  return (
    youdaoErrorList.find((item) => item.code === errorCode) || {
      code: errorCode,
      message: "",
    }
  );
}

/**
 * 语言代码列表
 */
export const languageItemList: LanguageItem[] = [
  {
    youdaoLanguageId: "auto",
    appleLanguageId: "auto",
    aliyunLanguageId: "auto",
    tencentLanguageId: "auto",
    baiduLanguageId: "auto",
    caiyunLanguageId: "auto",
    googleLanguageId: "auto",
    languageTitle: "Auto Language",
  },
  {
    youdaoLanguageId: "zh-CHS",
    appleLanguageId: "zh_CN",
    appleChineseLanguageTitle: "中文",
    aliyunLanguageId: "zh",
    tencentLanguageId: "zh",
    baiduLanguageId: "zh",
    caiyunLanguageId: "zh",
    googleLanguageId: "zh-CN",
    languageTitle: "Chinese-Simplified",
    voiceList: ["Ting-Ting"],
  },
  {
    youdaoLanguageId: "zh-CHT",
    appleLanguageId: "zh-TW",
    appleChineseLanguageTitle: "中文",
    aliyunLanguageId: "zh-tw",
    tencentLanguageId: "zh-TW",
    baiduLanguageId: "cht",
    caiyunLanguageId: "zh",
    googleLanguageId: "zh-TW",
    languageTitle: "Chinese-Traditional",
    voiceList: ["Ting-Ting"],
  },
  {
    youdaoLanguageId: "en",
    appleLanguageId: "en_US",
    appleChineseLanguageTitle: "英语",
    aliyunLanguageId: "en",
    tencentLanguageId: "en",
    youdaoWebLanguageId: "eng",
    eudicWebLanguageId: "en",
    baiduLanguageId: "en",
    caiyunLanguageId: "en",
    googleLanguageId: "en",
    languageTitle: "English",
    voiceList: ["Samantha", "Alex"],
  },
  {
    youdaoLanguageId: "ja",
    appleLanguageId: "ja_JP",
    appleChineseLanguageTitle: "日语",
    aliyunLanguageId: "ja",
    tencentDetectLanguageId: "jp",
    tencentLanguageId: "ja",
    youdaoWebLanguageId: "jap",
    baiduLanguageId: "jp",
    caiyunLanguageId: "ja",
    languageTitle: "Japanese",
    voiceList: ["Kyoko"],
  },
  {
    youdaoLanguageId: "ko",
    appleLanguageId: "ko_KR",
    appleChineseLanguageTitle: "韩语",
    aliyunLanguageId: "ko",
    tencentDetectLanguageId: "kr",
    tencentLanguageId: "ko",
    youdaoWebLanguageId: "ko",
    baiduLanguageId: "kor",
    languageTitle: "Korean",
    voiceList: ["Yuna"],
  },
  {
    youdaoLanguageId: "fr",
    appleLanguageId: "fr_FR",
    appleChineseLanguageTitle: "法语",
    aliyunLanguageId: "fr",
    tencentLanguageId: "fr",
    youdaoWebLanguageId: "fr",
    eudicWebLanguageId: "fr",
    baiduLanguageId: "fra",
    languageTitle: "French",
    voiceList: ["Amelie", "Thomas"],
  },
  {
    youdaoLanguageId: "es",
    appleLanguageId: "es_ES",
    appleChineseLanguageTitle: "西班牙语",
    aliyunLanguageId: "es",
    tencentLanguageId: "es",
    eudicWebLanguageId: "es",
    baiduLanguageId: "spa",
    languageTitle: "Spanish",
    voiceList: ["Jorge", "Juan", "Diego", "Monica", "Paulina"],
  },
  {
    youdaoLanguageId: "it",
    appleLanguageId: "it_IT",
    appleChineseLanguageTitle: "意大利语",
    aliyunLanguageId: "it",
    tencentLanguageId: "it",
    baiduLanguageId: "it",
    languageTitle: "Italian",
    voiceList: ["Alice", "Luca"],
  },
  {
    youdaoLanguageId: "de",
    appleLanguageId: "de_DE",
    appleChineseLanguageTitle: "德语",
    aliyunLanguageId: "de",
    tencentLanguageId: "de",
    eudicWebLanguageId: "de",
    baiduLanguageId: "de",
    languageTitle: "German",
    voiceList: ["Anna"],
  },
  {
    youdaoLanguageId: "pt",
    appleLanguageId: "pt_BR",
    appleChineseLanguageTitle: "葡萄牙语",
    aliyunLanguageId: "pt",
    tencentLanguageId: "pt",
    baiduLanguageId: "pt",
    languageTitle: "Portuguese",
    voiceList: ["Joana", "Luciana"],
  },
  {
    youdaoLanguageId: "ru",
    appleLanguageId: "ru_RU",
    appleChineseLanguageTitle: "俄语",
    aliyunLanguageId: "ru",
    tencentLanguageId: "ru",
    baiduLanguageId: "ru",
    languageTitle: "Russian",
    voiceList: ["Milena", "Yuri"],
  },
  {
    youdaoLanguageId: "ar",
    appleLanguageId: "ar_AE",
    appleChineseLanguageTitle: "阿拉伯语",
    aliyunLanguageId: "ar",
    tencentLanguageId: "ar",
    baiduLanguageId: "ara",
    languageTitle: "Arabic",
    voiceList: ["Maged"],
  },
  {
    youdaoLanguageId: "th",
    aliyunLanguageId: "th",
    tencentLanguageId: "th",
    baiduLanguageId: "th",
    languageTitle: "Thai",
    voiceList: ["Kanya"],
  },
  {
    youdaoLanguageId: "sv",
    aliyunLanguageId: "sv",
    baiduLanguageId: "swe",
    languageTitle: "Swedish",
    voiceList: ["Alva"],
  },
  {
    youdaoLanguageId: "nl",
    aliyunLanguageId: "nl",
    baiduLanguageId: "nl",
    languageTitle: "Dutch",
    voiceList: ["Ellen", "Xander"],
  },
  {
    youdaoLanguageId: "ro",
    aliyunLanguageId: "ro",
    baiduLanguageId: "rom",
    languageTitle: "Romanian",
    voiceList: ["Ioana"],
  },
  {
    youdaoLanguageId: "sk",
    aliyunLanguageId: "sk",
    baiduLanguageId: "slo",
    languageTitle: "Slovak",
    voiceList: ["Laura"],
  },
  {
    youdaoLanguageId: "hu",
    aliyunLanguageId: "hu",
    baiduLanguageId: "hu",
    languageTitle: "Hungarian",
    voiceList: ["Mariska"],
  },
  {
    youdaoLanguageId: "el",
    aliyunLanguageId: "el",
    baiduLanguageId: "el",
    languageTitle: "Greek",
    voiceList: ["Melina"],
  },
  {
    youdaoLanguageId: "da",
    aliyunLanguageId: "da",
    baiduLanguageId: "dan",
    languageTitle: "Danish",
    voiceList: ["Sara"],
  },
  {
    youdaoLanguageId: "fi",
    aliyunLanguageId: "fi",
    baiduLanguageId: "fin",
    languageTitle: "Finnish",
    voiceList: ["Satu"],
  },
  {
    youdaoLanguageId: "pl",
    aliyunLanguageId: "pl",
    baiduLanguageId: "pl",
    languageTitle: "Polish",
    voiceList: ["Zosia"],
  },
  {
    youdaoLanguageId: "cs",
    aliyunLanguageId: "cs",
    baiduLanguageId: "cs",
    languageTitle: "Czech",
    voiceList: ["Zuzana"],
  },
];

/*
 * @author: tisfeng
 * @createTime: 2022-06-26 11:13
 * @lastEditor: tisfeng
 * @lastEditTime: 2022-06-30 10:26
 * @fileName: components.tsx
 *
 * Copyright (c) 2022 by tisfeng, All Rights Reserved.
 */

import { Component } from "react";
import { languageItemList, SectionType, TranslateType } from "./consts";
import { ListItemActionPanelItem, YoudaoTranslateReformatResultItem } from "./types";
import { Action, ActionPanel, Color, Icon, Image, List } from "@raycast/api";
import { getGoogleWebTranslateURL, myPreferences } from "./utils";
import { playWordAudio } from "./audio";
import { openInEudic } from "./scripts";
import { downloadYoudaoAudio } from "./dict/youdao/request";

export const eudicBundleId = "com.eusoft.freeeudic";

export function getPlaySoundIcon(lightTintColor: string) {
  return {
    source: { light: "play.png", dark: "play.png" },
    tintColor: { light: lightTintColor, dark: "lightgray" },
  };
}

/**
  return the corresponding ImageLike based on the SectionType type
*/
export function getListItemIcon(sectionType: SectionType | TranslateType): Image.ImageLike {
  let dotColor: Color.ColorLike = Color.PrimaryText;
  switch (sectionType) {
    case TranslateType.Youdao: {
      dotColor = Color.Red;
      break;
    }
    case TranslateType.Apple: {
      dotColor = "#408080";
      break;
    }
    case TranslateType.Baidu: {
      dotColor = "#4169E1";
      break;
    }
    case TranslateType.Tencent: {
      dotColor = Color.Purple;
      break;
    }
    case TranslateType.Caiyun: {
      dotColor = Color.Green;
      break;
    }

    case SectionType.Translation: {
      dotColor = Color.Red;
      break;
    }
    case SectionType.Explanations: {
      dotColor = Color.Blue;
      break;
    }
    case SectionType.WebTranslation: {
      dotColor = Color.Yellow;
      break;
    }
    case SectionType.WebPhrase: {
      dotColor = "teal";
      break;
    }
  }

  let itemIcon: Image.ImageLike = {
    source: Icon.Dot,
    tintColor: dotColor,
  };
  if (sectionType === SectionType.Forms) {
    itemIcon = Icon.Text;
  }

  if (sectionType in TranslateType) {
    itemIcon = getTranslateTypeIcon(sectionType as TranslateType);
  }

  return itemIcon;
}

/**
 * Get translate type icon based on the section type
 */
function getTranslateTypeIcon(translatType: TranslateType): Image.ImageLike {
  return {
    source: `${translatType}-Translate.png`,
    mask: Image.Mask.RoundedRectangle,
  };
}

/**
  return List.Item.Accessory[] based on the SectionType type
*/
export function getWordAccessories(
  sectionType: SectionType | TranslateType,
  item: YoudaoTranslateReformatResultItem
): List.Item.Accessory[] {
  let wordExamTypeAccessory = [];
  let pronunciationAccessory = [];
  let wordAccessories: List.Item.Accessory[] = [];
  if (sectionType === SectionType.Translation) {
    if (item.examTypes) {
      wordExamTypeAccessory = [
        {
          icon: { source: Icon.Star, tintColor: Color.SecondaryText },
          tooltip: "Word included in the types of exam",
        },
        { text: item.examTypes?.join("  ") },
      ];
      wordAccessories = [...wordExamTypeAccessory];
    }
    if (item.phonetic) {
      pronunciationAccessory = [
        {
          icon: getPlaySoundIcon("gray"),
          tooltip: "Pronunciation",
        },
        { text: item.phonetic },
      ];
      wordAccessories = [...wordAccessories, { text: " " }, ...pronunciationAccessory];
    }
  }
  return wordAccessories;
}

export function ActionFeedback() {
  return (
    <Action.OpenInBrowser
      icon={Icon.QuestionMark}
      title="Feedback"
      url="https://github.com/raycast/extensions/issues"
    />
  );
}

export class ListActionPanel extends Component<ListItemActionPanelItem> {
  onPlaySound(text: string, fromLanguage: string) {
    console.log(`start play sound: ${text}`);
    const queryWordInfo = this.props.queryWordInfo;
    downloadYoudaoAudio(queryWordInfo, () => {
      playWordAudio(queryWordInfo.word, fromLanguage);
    });
  }

  render() {
    return (
      <ActionPanel>
        <ActionPanel.Section>
          {this.props.isInstalledEudic && (
            <Action
              icon={Icon.MagnifyingGlass}
              title="Open in Eudic"
              onAction={() => openInEudic(this.props.queryText)}
            />
          )}
          <Action.CopyToClipboard
            onCopy={() => {
              console.log("copy: ", this.props.copyText);
            }}
            title={`Copy Text`}
            content={this.props.copyText || ""}
          />
        </ActionPanel.Section>

        <ActionPanel.Section title="Search Query Text Online">
          {this.props.isShowOpenInEudicWeb && (
            <Action.OpenInBrowser icon={Icon.Link} title="Eudic Dictionary" url={this.props.eudicWebUrl} />
          )}
          {this.props.isShowOpenInYoudaoWeb && (
            <Action.OpenInBrowser icon={Icon.Link} title="Youdao Dictionary" url={this.props.youdaoWebUrl} />
          )}

          <Action.OpenInBrowser
            icon={Icon.Link}
            title="Google Translate"
            url={getGoogleWebTranslateURL(
              this.props.queryText,
              this.props.currentFromLanguage,
              this.props.currentTargetLanguage
            )}
          />
        </ActionPanel.Section>

        <ActionPanel.Section title="Play Sound">
          <Action
            title="Query Text"
            icon={getPlaySoundIcon("black")}
            shortcut={{ modifiers: ["cmd"], key: "s" }}
            onAction={() => this.onPlaySound(this.props?.queryText, this.props.currentFromLanguage?.youdaoLanguageId)}
          />
          <Action
            title="Result Text"
            icon={getPlaySoundIcon("black")}
            onAction={() => this.onPlaySound(this.props.copyText, this.props.currentTargetLanguage?.youdaoLanguageId)}
          />
        </ActionPanel.Section>

        {myPreferences.isDisplayTargetTranslationLanguage && (
          <ActionPanel.Section title="Target Language">
            {languageItemList.map((region) => {
              if (this.props.currentFromLanguage?.youdaoLanguageId === region.youdaoLanguageId) return null;

              return (
                <Action
                  key={region.youdaoLanguageId}
                  title={region.languageTitle}
                  onAction={() => this.props.onLanguageUpdate(region)}
                  icon={
                    this.props.currentTargetLanguage?.youdaoLanguageId === region.youdaoLanguageId
                      ? Icon.ArrowRight
                      : Icon.Globe
                  }
                />
              );
            })}
          </ActionPanel.Section>
        )}

        <ActionPanel.Section>
          <ActionFeedback />
        </ActionPanel.Section>
      </ActionPanel>
    );
  }
}

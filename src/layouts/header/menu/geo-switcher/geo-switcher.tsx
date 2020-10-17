import React from 'react';
import { Box, SelectedItem, Flag, MenuItem } from './geo-switcher.style';
import Popover from 'components/popover/popover';
import { FormattedMessage } from 'react-intl';
import { DEFlag } from 'assets/icons/DEFlag';
import { CNFlag } from 'assets/icons/CNFlag';
import { USFlag } from 'assets/icons/USFlag';
import { ILFlag } from 'assets/icons/ILFlag';
import { ESFlag } from 'assets/icons/ESFlag';
import { SAFlag } from 'assets/icons/SAFlag';
import { useLocale } from 'contexts/language/language.provider';
import { FaMapMarkerAlt } from 'react-icons/fa';

import { ReactiveBase  } from '@appbaseio/reactivesearch';
import { ReactiveOpenStreetMap } from '@appbaseio/reactivemaps';

const LANGUAGES = [
  { id: 'ar', label: 'Arabic', intlLangName: 'intlArabic', icon: <SAFlag /> },
  { id: 'zh', label: 'Chinese', intlLangName: 'intlChinese', icon: <CNFlag /> },
  { id: 'en', label: 'English', intlLangName: 'intlEnglish', icon: <USFlag /> },
  { id: 'de', label: 'German', intlLangName: 'intlGerman', icon: <DEFlag /> },
  { id: 'he', label: 'Hebrew', intlLangName: 'intlHebrew', icon: <ILFlag /> },
  { id: 'es', label: 'Spanish', intlLangName: 'intlSpanish', icon: <ESFlag /> },
];

const LanguageMenu = ({ onClick }) => {
  return (
    <>
      {LANGUAGES.map((item) => (
        <MenuItem onClick={onClick} key={item.id} value={item.id}>
          <span>{item.icon}</span>
          <FormattedMessage
            id={item.intlLangName}
            defaultMessage={item.label}
          />
        </MenuItem>
      ))}
    </>
  );
};

const GeoSwitcher: React.FC<{}> = () => {
  const { locale, changeLanguage } = useLocale();
  const selectedLanguage = LANGUAGES.find((x) => x.id === locale);
  const languageChangeHandler = (e) => {
    changeLanguage(e.target.value);
  };
  return (
    <Box>
      <Popover
        className="left"
        handler={
          <SelectedItem>
            <Flag><FaMapMarkerAlt style={{color: "#888"}} /></Flag>
            <span>
              {"Karnal"}
              {/*<FormattedMessage*/}
              {/*  id={selectedLanguage?.intlLangName}*/}
              {/*  defaultMessage={selectedLanguage?.label}*/}
              {/*/>*/}
            </span>
          </SelectedItem>
        }
        content={
          <div style={{
            width:"612px",
            maxHeight:"500px",
            padding: "6px"
          }}>
            <ReactiveBase
              app="reaction.shops"
              url="https://elastic.craflo.com/"
              credentials="elastic:RvZi60f38Y6jVKZGS6908yo9"
              mapKey="AIzaSyBCZ7Lk_9ZC-EfEkgNB5XdPUebFxRqGh3o">
                <ReactiveOpenStreetMap
                  componentId="crafloArtMap"
                  dataField="addressBook.address1"
                  renderData={result => ({
                    label: result.mag
                  })}
                  size={100}
                  stream={true}
                  showMarkerClusters={true}
                  showSearchAsMove={true}
                  searchAsMove={true}
                  autoCenter={true}
                  style={{
                    height:"500px",
                    width:"600px",
                    position:"relative"
                  }}
                />
            </ReactiveBase>
          </div>
        }
      />
    </Box>
  );
};

export default GeoSwitcher;

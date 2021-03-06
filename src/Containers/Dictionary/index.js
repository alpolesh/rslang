import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Loading from '../../Components/Loading';
import LearningWords from '../../Components/Dictionary/LearningWords';
import ProgressLine from '../../Components/Dictionary/ProgressLine';
import { SettingsButton, SettingsModal } from '../../Components/Dictionary/Settings';
import { getUserSettings, putUserSettings } from '../../Services/UserSettings';
import './dictionary.css';
import { getWordsToLearn } from '../../Services/ankiService';

const { TabPane } = Tabs;

const Dictionary = () => {
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [auth, setAuth] = useState(null);
  const [options, setOptions] = useState({});
  const [learningWords, setLearningWords] = useState([]);
  const [indexWord, setIndexWord] = useState(0);

  const setUserSettings = (userOptions) => {
    let cardSettings = {
      translateWord: userOptions.translateWord,
      wordExplaining: userOptions.wordExplaining,
      sentenceExample: userOptions.sentenceExample,
    };
    cardSettings = Object.keys(cardSettings).map((i) => {
      if (cardSettings[i]) {
        return i;
      }
      return false;
    }).filter((i) => {
      if (i) return i;
      return false;
    });

    setOptions({
      ...userOptions,
      cardSettings,
    });
  };

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    if (auth) {
      (async (user) => {
        const userOptions = await getUserSettings(user.userId, user.token);
        setUserSettings({
          ...userOptions.optional,
          wordsPerDay: userOptions.wordsPerDay,
        });
        setLoading(false);
      })(auth);
    }
  }, [auth]);

  useEffect(() => {
    async function gettingWords() {
      const words = await getWordsToLearn(options.wordsPerDay);
      setLearningWords(words);
    }
    if (auth) gettingWords();
  }, [auth]);

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const onSettingsOk = async (newSettings) => {
    setConfirmLoading(true);
    const { cardSettings, wordsPerDay, ...preUpdateNewSettings } = newSettings;
    const updateNewSettings = {
      wordsPerDay,
      optional: preUpdateNewSettings,
    };
    const updatedSettings = await putUserSettings(auth.userId, auth.token, updateNewSettings);
    setUserSettings(updatedSettings);
    setConfirmLoading(false);
    closeSettings();
  };

  const onSettingsCancel = () => {
    closeSettings();
  };

  if (loading) {
    return (
      <div className="dictionary">
        <Loading />
      </div>
    );
  }

  return (
    <div className="dictionary">
      <Tabs
        defaultActiveKey="1"
        size="large"
        tabBarExtraContent={
          <SettingsButton open={openSettings} />
        }
      >
        <TabPane tab="Новый" key="1">
          <LearningWords
            words={learningWords}
            index={indexWord}
            setIndex={setIndexWord}
            options={options}
          />
        </TabPane>
        <TabPane tab="Сложные" key="2">
          <h1>Табчик с сложными словами</h1>
        </TabPane>
        <TabPane tab="Удалённые" key="3">
          <h1>Табчик с удалёнными словами</h1>
        </TabPane>
      </Tabs>
      <ProgressLine done={indexWord} total={25} />
      <SettingsModal
        visible={showSettings}
        onOk={onSettingsOk}
        onCancel={onSettingsCancel}
        options={options}
        loading={confirmLoading}
      />
    </div>
  );
};

export default Dictionary;

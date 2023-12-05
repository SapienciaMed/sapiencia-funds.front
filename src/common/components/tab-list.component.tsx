import { useContext, useEffect, useState } from "react";
import { ITabsMenuTemplate } from "../interfaces/tabs-menu.interface";
import { AppContext } from "../contexts/app.context";

interface IAppProps {
  tabs: ITabsMenuTemplate[];
  start?: ITabsMenuTemplate;
  index?: number;
  className?: string;
  titleMessage?: string;
  description?:string
}

function TabListComponent({
  tabs,
  className,
  start,
  index,
  titleMessage,
  description
}: IAppProps): React.JSX.Element {
  const tabList = {};
  tabs.forEach(
    (tab) =>
      (tabList[`${tab.title}`] = {
        content: tab.content,
        action: tab.action,
      })
  );
  const [selectedTab, setSelectedTab] = useState<ITabsMenuTemplate>(
    start ? start : null
  );
  const { setMessage, disabledFields, setDisabledFields } = useContext(AppContext);

  useEffect(() => {
    if (!selectedTab)
      if (tabs.length !== 0) {
        setSelectedTab(tabs[0]); 
      }
  }, [tabs]);

  useEffect(() => {
    if (index) {
      setSelectedTab(tabs[index]);
    }
  }, [index]);


  const showMessage  = (tab: ITabsMenuTemplate) => {
    setMessage({
        show: true,
        title: titleMessage || '',
        description: description || '',
        background: true,
        OkTitle: 'Aceptar',
        cancelTitle: 'Cancelar',
        onOk() {
            setDisabledFields(false);
            setMessage({});
            setSelectedTab(tab);
        },
        onCancel() {
            setMessage({});
        },
    });
  }

  

  return (
    <div className={`tabs-component ${className ? className : ""}`}>
      <div className="tabs-selection">
        {tabs.map((tab) => {
          let active = "";
          if (selectedTab) if (selectedTab.id === tab.id) active = "active";
          return (
            <div
              className={`tab-option ${active}`}
              key={tab.id}
              onClick={() => {
                if (disabledFields && titleMessage != '') {
                  showMessage(tab)
                }else{
                  setSelectedTab(tab);
                  if (tab.action) tab.action();
                }
              }}
            >
              {tab.title}
            </div>
          );
        })}
      </div>
      <div className="tabs-content">
        {selectedTab ? tabList[`${selectedTab?.title}`].content : ""}
      </div>
    </div>
  );
}

export default TabListComponent;



export type StartMenuButtonPropsType = {
    label: string;
    selected: boolean;
    onClick: () => void;
};

export type StartMenuSettingsType = {
    id: number;
    title: string;
    buttons: StartMenuButtonType[];
};

export type StartMenuButtonType = {
    type: string;
    label: string;
    selected: boolean;
};

export type SelectedSettingsType = {
    theme: string;
    playerNumbers: number;
    grid: string;
};

export type NumbersListType = {
    number: number;
    active: boolean;
    isClicked: boolean;
  };
  
  export type IconsListType = {
    icon: string;
    active: boolean;
    isClicked: boolean;
  };
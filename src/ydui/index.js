import Vue from 'vue'

import {
	Button,
	ButtonGroup
} from 'vue-ydui/dist/lib.rem/button';

import {
	Switch
} from 'vue-ydui/dist/lib.rem/switch';

import {
	KeyBoard
} from 'vue-ydui/dist/lib.rem/keyboard';

import {
	Icons
} from 'vue-ydui/dist/lib.rem/icons';

import {
	NavBar,
	NavBarBackIcon,
	NavBarNextIcon
} from 'vue-ydui/dist/lib.rem/navbar';

import {
	Slider,
	SliderItem
} from 'vue-ydui/dist/lib.rem/slider';

import {
	RollNotice,
	RollNoticeItem
} from 'vue-ydui/dist/lib.rem/rollnotice';

import {
	FlexBox,
	FlexBoxItem
} from 'vue-ydui/dist/lib.rem/flexbox';

import {
	InfiniteScroll
} from 'vue-ydui/dist/lib.rem/infinitescroll';

import {
	Tab,
	TabPanel
} from 'vue-ydui/dist/lib.rem/tab';

import {
	ListTheme,
	ListItem,
	ListOther
} from 'vue-ydui/dist/lib.rem/list';

import {
	Badge
} from 'vue-ydui/dist/lib.rem/badge';



Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);
Vue.component(Switch.name, Switch);
Vue.component(KeyBoard.name, KeyBoard);
Vue.component(NavBar.name, NavBar);
Vue.component(NavBarBackIcon.name, NavBarBackIcon);
Vue.component(NavBarNextIcon.name, NavBarNextIcon);
Vue.component(Icons.name, Icons);
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);
Vue.component(RollNotice.name, RollNotice);
Vue.component(RollNoticeItem.name, RollNoticeItem);
Vue.component(FlexBox.name, FlexBox);
Vue.component(FlexBoxItem.name, FlexBoxItem);
Vue.component(InfiniteScroll.name, InfiniteScroll);
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
Vue.component(ListTheme.name, ListTheme);
Vue.component(ListItem.name, ListItem);
Vue.component(ListOther.name, ListOther);
Vue.component(Badge.name, Badge);

// 加载基础样式
import 'vue-ydui/dist/ydui.base.css';
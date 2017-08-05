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

import {
	Accordion,
	AccordionItem
} from 'vue-ydui/dist/lib.rem/accordion';

import {
	Layout
} from 'vue-ydui/dist/lib.rem/layout';

import {
	CountUp
} from 'vue-ydui/dist/lib.rem/countup';

import {
	CellGroup,
	CellItem
} from 'vue-ydui/dist/lib.rem/cell';

import {
	Confirm,
	Alert,
	Toast,
	Notify,
	Loading
} from 'vue-ydui/dist/lib.rem/dialog';

import {
	Input
} from 'vue-ydui/dist/lib.rem/input';

import {
	CheckBox,
	CheckBoxGroup
} from 'vue-ydui/dist/lib.rem/checkbox';

import {
	SendCode
} from 'vue-ydui/dist/lib.rem/sendcode';



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
Vue.component(Accordion.name, Accordion);
Vue.component(AccordionItem.name, AccordionItem);
Vue.component(Layout.name, Layout);
Vue.component(CountUp.name, CountUp);
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);
Vue.component(Input.name, Input);
Vue.component(CheckBox.name, CheckBox);
Vue.component(CheckBoxGroup.name, CheckBoxGroup);
Vue.component(SendCode.name, SendCode);

Vue.prototype.$dialog = {
	confirm: Confirm,
	alert: Alert,
	toast: Toast,
	notify: Notify,
	loading: Loading,
};

// 加载基础样式
import 'vue-ydui/dist/ydui.base.css';
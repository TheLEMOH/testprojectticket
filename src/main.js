import { createApp } from "vue";
import store from "./store";
/* PRIME */
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";

import PrimeVue from "primevue/config";

import Button from "primevue/button";
import TieredMenu from "primevue/tieredmenu";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Dropdown from "primevue/dropdown";
import AutoComplete from "primevue/autocomplete";
import Divider from "primevue/divider";
import Checkbox from "primevue/checkbox";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import PickList from "primevue/picklist";
import TreeTable from "primevue/treetable";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import ProgressBar from "primevue/progressbar";
import Editor from "primevue/editor";
import Menubar from "primevue/menubar";
import CascadeSelect from "primevue/cascadeselect";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import Badge from "primevue/badge";
import TabMenu from "primevue/tabmenu";
import Password from "primevue/password";
import Card from "primevue/card";
import Calendar from "primevue/calendar";
import MultiSelect from "primevue/multiselect";
/*  */
import Tooltip from "primevue/tooltip";

import App from "./App.vue";

import router from "./router";

const app = createApp(App);

app.directive("tooltip", Tooltip);

app.component("Button", Button);
app.component("TieredMenu", TieredMenu);
app.component("InputText", InputText);
app.component("InputMask", InputMask);
app.component("Dropdown", Dropdown);
app.component("AutoComplete", AutoComplete);
app.component("Divider", Divider);
app.component("Checkbox", Checkbox);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Textarea", Textarea);
app.component("Dialog", Dialog);
app.component("PickList", PickList);
app.component("TreeTable", TreeTable);
app.component("ProgressBar", ProgressBar);
app.component("Editor", Editor);
app.component("Menubar", Menubar);
app.component("CascadeSelect", CascadeSelect);
app.component("Toast", Toast);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Badge", Badge);
app.component("TabMenu", TabMenu);
app.component("Password", Password);
app.component("Card", Card);
app.component("Calendar", Calendar);
app.component("MultiSelect", MultiSelect);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(store);
app.use(ConfirmationService);
app.mount("#app");

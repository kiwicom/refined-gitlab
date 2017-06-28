export const options = [
  {
    type: "text",
    name: "labelCategories",
    label: "Label categories",
    description: "",
    defaultValue: "module,type,prio,process,qa,design,testing,waiting,weight,no-module"
  },
	{
		type: "text",
		name: "appendToDeploySection",
		label: "Append to deploy section",
		description: "",
		defaultValue: "<a href='https://skymock.skypicker.com?baseUrl=<%= deployLink %>cs' target='_blank'>Skymock</a>"
	},
	{
		type: "text",
		name: "appendToPipelineSection",
		label: "Append to pipeline section",
		description: "",
		defaultValue: "<a href='registry.skypicker.com:5005/<%= group %>/<%= project %>:<%= hash %>' target='_blank'>Registry</a>"
	},
	{
		type: "checkbox",
		name: "disableLabelColors",
		label: "Disable label colors",
		description: "",
		defaultValue: false
	},
	{
		type: "checkbox",
		name: "disableKeyboardShortcuts",
		label: "Disable keyboard shortcuts",
		description: "",
		defaultValue: false
	},
];

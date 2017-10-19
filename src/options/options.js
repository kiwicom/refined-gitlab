export default {
  mrSquashByDefault: {
    type: "checkbox",
    label: "Merge request: Squash - checked by default",
    description: "",
    defaultValue: true,
  },
  mrRemoveBranchByDefault: {
    type: "checkbox",
    label: "Merge request: Remove branch - checked by default",
    description: "",
    defaultValue: true,
  },

  assignShortcut: {
    type: "text",
    label: "Assign shortcut <small><a href='https://craig.is/killing/mice#keys'>Supported syntax</a></small>",
    defaultValue: "alt+a",
  },
  labelShortcut1: {
    type: "text",
    label: "Label toggle shortcut #1",
    defaultValue: "",
  },
  labelShortcut2: {
    type: "text",
    label: "Label toggle shortcut #2",
    defaultValue: "",
  },
  labelShortcut3: {
    type: "text",
    label: "Label toggle shortcut #3",
    defaultValue: "",
  },
  labelShortcut4: {
    type: "text",
    label: "Label toggle shortcut #4",
    defaultValue: "",
  },
  labelShortcut5: {
    type: "text",
    label: "Label toggle shortcut #5",
    defaultValue: "",
  },
  labelShortcut6: {
    type: "text",
    label: "Label toggle shortcut #6",
    defaultValue: "",
  },
  labelShortcut7: {
    type: "text",
    label: "Label toggle shortcut #7",
    defaultValue: "",
  },
  labelShortcut8: {
    type: "text",
    label: "Label toggle shortcut #8",
    defaultValue: "",
  },
  labelShortcut9: {
    type: "text",
    label: "Label toggle shortcut #9",
    defaultValue: "",
  },
  labelShortcut0: {
    type: "text",
    label: "Label toggle shortcut #0",
    defaultValue: "",
  },
  appendToDeploySection: {
    type: "text",
    label: "Append to deploy section",
    description: "",
    defaultValue:
      "<a href='https://skymock.skypicker.com?baseUrl=<%= deployLink %>cs' target='_blank'>Skymock</a>",
  },
  appendToPipelineSection: {
    type: "text",
    label: "Append to pipeline section",
    description: "",
    defaultValue:
      "<a href='registry.skypicker.com:5005/<%= group %>/<%= project %>:<%= hash %>' target='_blank'>Registry</a>",
  },
  disableLabelColors: {
    type: "checkbox",
    label: "Disable label colors",
    description: "",
    defaultValue: false,
  },
  hideRepoAvatars: {
    type: "checkbox",
    label: "Hide repo avatars",
    description: "",
    defaultValue: true,
  },
  doTrack: {
    type: "checkbox",
    label: "Usage reports",
    description: "Send anonymous usage reports to Google Analytics.",
    defaultValue: true,
  },
};

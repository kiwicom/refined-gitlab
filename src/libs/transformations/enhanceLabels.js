export default () => {
  const labelsEl = document.getElementsByClassName("issuable-show-labels")[0];
  if (labelsEl !== undefined) {

    const issuableTimeEl = document.querySelector(".detail-page-header .issuable-meta time").outerHTML

    const labelsCollection = labelsEl.getElementsByTagName("a");
    const labelsArray = [].slice.call(labelsCollection);

    const notesCollection = document.querySelectorAll(
      "#notes-list .system-note-message p"
    );
    const notesArray = [].slice.call(notesCollection);

    const labelsLastAdded = {};

    notesArray.forEach(noteEl => {
      const noteText = noteEl.textContent.trim();
      const parentEl =
        noteEl.parentElement.parentElement.parentElement.parentElement; // .note-header-info
      const timeEl = parentEl.querySelector("time");

      if (
        noteText.startsWith("added") &&
        (noteText.endsWith("label") || noteText.endsWith("labels"))
      ) {
        // `added ` `LABEL` `label`
        // `added ` `LABEL` `LABEL` ` labels`
        // `added ` `LABEL` `and removed ` `LABEL` ` labels`
        const noteNodesCollection = noteEl.childNodes;
        const noteNodesArray = [].slice.call(noteNodesCollection);
        const interestingNoteNodesArray = noteNodesArray
          .slice(1) // ignore first "added "
          .filter(x => x.textContent.trim()); // ignore nodes with just spaces " "

        // eslint-disable-next-line no-restricted-syntax
        for (const node of interestingNoteNodesArray) {
          if (node.nodeName !== "A") break;
          const labelText = node.innerText;
          labelsLastAdded[labelText] = timeEl.outerHTML;
        }
      }
    });

    labelsArray.forEach(labelEl => {
      const text = labelEl.textContent;
      const el = labelsLastAdded[text] || issuableTimeEl;

      labelEl.insertAdjacentHTML("afterend", `<small>${el}</small>`);
    });
  }
};

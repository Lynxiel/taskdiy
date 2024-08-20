import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import * as React from "react";
import { useState } from "react";

import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

import {
  SPEECH_TO_TEXT_COMMAND,
  SUPPORT_SPEECH_RECOGNITION
} from "./SpeechToText";

export default function ActionsPlugin({
  isRichText
}: {
  isRichText: boolean;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [isSpeechToText, setIsSpeechToText] = useState(false);

  return (
    <div className="actions">
      {SUPPORT_SPEECH_RECOGNITION && (
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.dispatchCommand(SPEECH_TO_TEXT_COMMAND, !isSpeechToText);
            setIsSpeechToText(!isSpeechToText);
          }}
          className={
            "action-button action-button-mic " +
            (isSpeechToText ? "active" : "")
          }
          title="Speech To Text"
          aria-label={`${isSpeechToText ? "Enable" : "Disable"} speech to text`}
        >
          <KeyboardVoiceIcon/>
        </button>
      )}
    </div>
  );
}

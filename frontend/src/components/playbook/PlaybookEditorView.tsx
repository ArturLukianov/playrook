import MDEditor from '@uiw/react-md-editor';

interface PlaybookEditorViewProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

export function PlaybookEditorView({
  value,
  onChange,
}: PlaybookEditorViewProps) {
  return (
    <div className="h-full w-full">
      <MDEditor
        onChange={onChange}
        value={value}
        height="100%"
        highlightEnable
        preview="edit"
        className="h-full"
      />
    </div>
  );
}

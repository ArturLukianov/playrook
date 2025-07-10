import { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface PlaybookEditorViewProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

interface ValidationError {
  message: string;
  line?: number;
}

export function PlaybookEditorView({
  value,
  onChange,
}: PlaybookEditorViewProps) {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValid, setIsValid] = useState(true);

  const validatePlaybook = (content: string): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    if (!content || content.trim().length === 0) {
      errors.push({ message: 'Playbook content cannot be empty' });
      return errors;
    }

    const lines = content.split('\n');
    
    // Check for required sections
    const hasStart = content.includes('# Start');
    const hasNodes = content.includes('## ');
    
    if (!hasStart) {
      errors.push({ message: 'Playbook must have a # Start section' });
    }
    
    if (!hasNodes) {
      errors.push({ message: 'Playbook must have at least one node (## section)' });
    }

    // Check for basic syntax
    lines.forEach((line, index) => {
      if (line.trim().startsWith('## ') && line.trim().length <= 4) {
        errors.push({ 
          message: 'Node titles cannot be empty', 
          line: index + 1 
        });
      }
      
      if (line.trim().startsWith('### ') && line.trim().length <= 5) {
        errors.push({ 
          message: 'Action titles cannot be empty', 
          line: index + 1 
        });
      }
    });

    return errors;
  };

  useEffect(() => {
    if (value) {
      const validationErrors = validatePlaybook(value);
      setErrors(validationErrors);
      setIsValid(validationErrors.length === 0);
    } else {
      setErrors([]);
      setIsValid(true);
    }
  }, [value]);

  return (
    <div className="h-full w-full flex flex-col">
      {/* Validation Status */}
      {errors.length > 0 && (
        <div className="p-3 bg-red-950 border border-red-500 rounded-md mb-2">
          <div className="flex items-center gap-2 text-red-300 mb-2">
            <AlertCircle className="h-4 w-4" />
            <span className="font-semibold">Validation Errors:</span>
          </div>
          <ul className="text-sm text-red-200 space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="flex items-start gap-2">
                {error.line && (
                  <span className="text-red-400 font-mono text-xs">
                    Line {error.line}:
                  </span>
                )}
                <span>{error.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isValid && value && value.trim().length > 0 && (
        <div className="p-2 bg-green-950 border border-green-500 rounded-md mb-2">
          <div className="flex items-center gap-2 text-green-300">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Playbook is valid</span>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1">
        <MDEditor
          onChange={onChange}
          value={value}
          height="100%"
          highlightEnable
          preview="edit"
          className="h-full"
        />
      </div>
    </div>
  );
}

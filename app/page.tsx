'use client';

import { useState } from 'react';

export default function Home() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const runCommand = async () => {
    const response = await fetch('/api/run-command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command }),
    });

    const data = await response.json();
    if (response.ok) {
      setOutput(data.output);
    } else {
      setOutput(data.error);
    }
  };

  return (
    <div>
      <h1>Run Shell Command</h1>
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        className='text-black'
        placeholder="Enter command"
      />
      <button onClick={runCommand}>Run</button>
      <pre dangerouslySetInnerHTML={{ __html: output }}></pre>
    </div>
  );
}

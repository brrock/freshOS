import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import AnsiToHtml from 'ansi-to-html';

const execPromise = promisify(exec);

export async function POST(req: NextRequest) {
  const { command } = await req.json();

  if (!command) {
    return NextResponse.json({ error: 'No command provided' }, { status: 400 });
  }

  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      return NextResponse.json({ error: stderr }, { status: 500 });
    }
    
    // Convert ANSI to HTML
    const convert = new AnsiToHtml();
    const htmlOutput = convert.toHtml(stdout);

    return NextResponse.json({ output: htmlOutput }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}

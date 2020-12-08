import React, { useState } from 'react'
import Terminal, { ColorMode, LineType } from 'react-terminal-ui'
import './terminal.css'
import { Paper } from '@material-ui/core'
import downloadCV from '../lib/DownloadCV'

const getHelpMenu = () => {
	return [
		{ type: LineType.Output, value: 'These are the available commands:' },
		{ type: LineType.Output, value: 'clear -> cleans terminal window' },
		{ type: LineType.Output, value: 'help -> shows available commands' },
		{ type: LineType.Output, value: 'download-cv -> allows for CV download' },
	]
}

export default function TerminalController() {
	const [data, setData] = useState([
		{
			type: LineType.Output,
			value: 'Welcome! Type help to check the available commands...',
		},
	])

	const handleInput = (input: string) => {
		let ld = [...data]
		ld.push({ type: LineType.Input, value: input })
		if (input.toLocaleLowerCase() === 'help') {
			ld.push(...getHelpMenu())
		} else if (input.toLocaleLowerCase() === 'clear') {
			ld = []
		} else if (input.toLocaleLowerCase() === 'download-cv') {
			downloadCV()
		} else {
			ld.push({ type: LineType.Output, value: 'Unrecognized command' })
		}
		setData(ld)
	}

	return (
		<Paper
			elevation={10}
			className='paper'
			style={{ backgroundColor: '#313131' }}
		>
			<Terminal
				prompt='🚀'
				name='Terminal'
				colorMode={ColorMode.Dark}
				lineData={data}
				onInput={handleInput}
			/>
		</Paper>
	)
}

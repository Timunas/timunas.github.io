import React, { useState, useEffect } from 'react'
import Terminal, { ColorMode, LineType } from 'react-terminal-ui'
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

const PaperWrapper = 'terminal-paper-wrapper'
const TerminalHiddenInput = 'terminal-hidden'

export default function TerminalController() {
	const [data, setData] = useState([
		{
			type: LineType.Output,
			value: 'Welcome! Click and type help to check the available commands...',
		},
	])

	useEffect(() => {
		document.onclick = () => {}
		document.getElementById(TerminalHiddenInput)?.blur()
		document.getElementById(PaperWrapper)?.addEventListener(
			'click',
			function (e) {
				document.getElementById(TerminalHiddenInput)?.focus()
			},
			false
		)
	}, [])

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
			id={PaperWrapper}
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

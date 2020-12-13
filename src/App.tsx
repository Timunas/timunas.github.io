import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
	Container,
	Grid,
	Typography,
	Box,
	Button,
	Paper,
	SvgIcon,
} from '@material-ui/core'
import { ReactComponent as TerminalIcon } from './assets/terminal.svg'
import TerminalController from './components/TerminalController'
import SocialMediaButtons from './components/SocialMediaButtons'
import { Animated } from 'react-animated-css'
import MarkdownPreview from '@uiw/react-markdown-preview'
import markdownFilePath from './assets/SUMMARY.md'
import {
	createMuiTheme,
	responsiveFontSizes,
	ThemeProvider,
} from '@material-ui/core/styles'
import DescriptionIcon from '@material-ui/icons/Description'
import downloadCV from './lib/DownloadCV'
import ResponsiveButton from './components/ResponiveButton'

const theme = responsiveFontSizes(createMuiTheme())

const useStyles = makeStyles((_) => ({
	buttons: {
		marginTop: '10px',
	},
	terminal: {
		marginTop: '35px',
	},
	modesButton: {
		marginTop: '10px',
	},
}))

export default function App() {
	const styles = useStyles()
	const [simpleMode, setSimpleMode] = useState(false)
	const [mdString, setMdString] = useState('')

	useEffect(() => {
		fetch(markdownFilePath)
			.then((data) => data.text())
			.then((text) => setMdString(text))
	}, [])

	const handleSimpleModeClick = () => {
		setSimpleMode(true)
	}
	const handleTerminalModeClick = () => {
		setSimpleMode(false)
	}

	return (
		<Container>
			<Grid container>
				{renderTitle()}
				{renderSocialMediaButtons(styles)}
				{simpleMode
					? renderSimpleMode(
							styles,
							mdString,
							simpleMode,
							handleTerminalModeClick
					  )
					: renderTerminalMode(styles, !simpleMode, handleSimpleModeClick)}
			</Grid>
		</Container>
	)
}

const renderSimpleMode = (
	styles: Record<'terminal' | 'modesButton', string>,
	markdown: string,
	isVisible: boolean,
	onClick: () => void
) => (
	<React.Fragment>
		<Grid item xs={12} className={styles.modesButton}>
			<Container maxWidth='md'>
				<Box display='flex' justifyContent='space-between'>
					<ResponsiveButton
						variant='outlined'
						style={{ color: '#ffbd69' }}
						onClick={() => onClick()}
						startIcon={
							<SvgIcon
								component={TerminalIcon}
								title=''
								htmlColor='white'
								fontSize='small'
							/>
						}
					>
						Show me a terminal
					</ResponsiveButton>
					<ResponsiveButton
						variant='outlined'
						style={{ color: '#ffbd69' }}
						onClick={() => downloadCV()}
						startIcon={<DescriptionIcon htmlColor='white' fontSize='small' />}
					>
						Download CV
					</ResponsiveButton>
				</Box>
			</Container>
		</Grid>
		<Grid item xs={12} className={styles.terminal}>
			<Container maxWidth='md'>
				<Animated
					animationIn='fadeIn'
					animationOut='bounceOut'
					isVisible={isVisible}
				>
					<Paper
						elevation={10}
						style={{
							padding: '30px',
						}}
					>
						<MarkdownPreview source={markdown} />
					</Paper>
				</Animated>
			</Container>
		</Grid>
	</React.Fragment>
)

const renderTerminalMode = (
	styles: Record<'terminal' | 'modesButton', string>,
	isVisible: boolean,
	onClick: () => void
) => (
	<React.Fragment>
		<Grid item xs={12} className={styles.terminal}>
			<Container maxWidth='md'>
				<Animated
					animationIn='bounce'
					animationOut='fadeOut'
					isVisible={isVisible}
				>
					<TerminalController />
				</Animated>
			</Container>
		</Grid>
		<Grid item xs={12} className={styles.modesButton}>
			<Container>
				<Box justifyContent='center' display='flex'>
					<Button
						variant='outlined'
						style={{ color: '#ffbd69' }}
						onClick={() => onClick()}
					>
						Show me something simple
					</Button>
				</Box>
			</Container>
		</Grid>
	</React.Fragment>
)

const renderSocialMediaButtons = (styles: Record<'buttons', string>) => (
	<Grid item xs={12} className={styles.buttons}>
		<Container>
			<SocialMediaButtons />
		</Container>
	</Grid>
)

const renderTitle = () => (
	<Grid item xs={12}>
		<Container>
			<Animated animationIn='pulse' animationOut='bounceOut' isVisible={true}>
				<ThemeProvider theme={theme}>
					<Typography
						variant='h2'
						align='center'
						gutterBottom
						style={{ fontFamily: 'JetBrains Mono', color: '#c02739' }}
					>
						João Suzana Ferreira
					</Typography>
				</ThemeProvider>
			</Animated>
		</Container>
	</Grid>
)

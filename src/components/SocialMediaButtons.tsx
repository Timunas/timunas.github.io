import React from 'react'
import { Box, IconButton, SvgIcon } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import { ReactComponent as KeybaseIcon } from '../assets/keybase.svg'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

export default function SocialMediaButtons() {
	return (
		<Box justifyContent='center' display='flex'>
			<IconButton aria-label='email' href={'mailto:joao.suzana@gmail.com'}>
				<MailOutlineIcon htmlColor='white' />
			</IconButton>
			<IconButton
				aria-label='github'
				onClick={() => window.open('https://github.com/Timunas')}
			>
				<GitHubIcon htmlColor='white' />
			</IconButton>
			<IconButton
				aria-label='linkedin'
				onClick={() =>
					window.open('https://www.linkedin.com/in/joao-suzana-ferreira')
				}
			>
				<LinkedInIcon htmlColor='white' />
			</IconButton>
			<IconButton
				aria-label='github'
				onClick={() => window.open('https://keybase.io/joaoferreira')}
			>
				<SvgIcon component={KeybaseIcon} htmlColor='white' title='' />
			</IconButton>
		</Box>
	)
}

import React, { PropsWithChildren } from 'react'
import { Button, useMediaQuery, useTheme } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	font: {
		fontSize: '0.65rem',
	},
})

export default function ResponsiveButton(
	props: PropsWithChildren<ButtonProps>
) {
	const theme = useTheme()
	const styles = useStyles()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

	return (
		<Button
			{...props}
			size={isSmallScreen ? 'small' : 'large'}
			className={isSmallScreen ? styles.font : ''}
		>
			{props.children}
		</Button>
	)
}

import * as React from 'react'
import { twMerge } from "tailwind-merge"

export function SendButton({ disabled, children, onClick }) {
	const commonCn = `
		cursor-pointer
		rounded
		inline-block p-2 my-2
		text-white
	   bg-sky-600
		hover:bg-sky-700
		`
	const disabledCn = disabled ? `
		cursor-not-allowed
		bg-gray-100 text-gray-500 
		hover:bg-gray-100
		` : ``

	return (
		<button className={twMerge(commonCn + disabledCn)} type='button' disabled={disabled} onClick={onClick}>
			{children}
		</button>
	)
}
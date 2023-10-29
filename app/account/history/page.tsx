export default async function History() {
	await new Promise(res => setTimeout(() => res('res'), 1000))

	return (
		<div>
			<h1 className='font-title text-5xl'>History of your searches</h1>
		</div>
	)
}

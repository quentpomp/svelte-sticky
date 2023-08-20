<script lang="ts">
	import { mode } from '$lib/store/store';
</script>

<div
	class="w-full flex flex-col gap-4 md:px-96 py-12 {$mode
		? 'bg-neutral-900 text-white'
		: 'bg-[#fafafa] text-black'}"
>
	<h1 class="text-3xl font-bold mb-4 text-yellow-400">Elevate Your Creativity with Sticky</h1>
	<p class="whitespace-normal font-semibold">
		Welcome to Sticky, where your ideas take center stage. Our platform is your canvas, designed to
		inspire and empower your journey of self-expression and productivity.
	</p>

	<section class="flex flex-col gap-1 font-semibold">
		<h2 class="text-2xl font-bold mb-4 text-blue-500">Seamless Note-Taking, Tailored for You</h2>
		<li >
			Discover the art of streamlined note-taking with our Free Tier. Your thoughts are safeguarded
			by end-to-end data encryption, giving you the confidence to capture your most personal
			insights. Choose between two note layouts, each designed to cater to your unique style and
			content.
		</li>
		<li>
			With a generous capacity of 20 notes, you're free to explore, experiment, and grow your ideas
			without constraints.
		</li>
	</section>

	<section class=" flex flex-col gap-1 font-semibold">
		<h2 class="text-2xl font-bold mb-4 text-blue-500">Unlock Limitless Possibilities with Pro</h2>
		<li>
			Ready to take your creativity to the next level? Our Pro Tier is your gateway to a world of
			innovation and boundless potential. Immerse yourself in a collection of over six diverse note
			layouts, each carefully crafted to amplify your unique creative process.
		</li>
		<li>
			With the power of unlimited stickies, file uploads, and storage, your ideas are free to
			flourish. Collaborate seamlessly with friends and colleagues, and get ready for the future
			with upcoming features like smart tags and AI suggestions.
		</li>
		<li>
			Experience a workspace that adapts to your needs – cross-platform support, advanced
			organization, and customization options are coming soon to tailor your environment to
			perfection. Dive into analytics and insights, enjoy seamless import/export options, and savor
			uninterrupted productivity even offline.
		</li>
		<li>
			Rest assured, your journey is our priority. Benefit from dedicated customer support as we
			partner with you to make your creative aspirations a reality.
		</li>
	</section>

	<p class="whitespace-normal text-xl font-bold text-blue-500">
		Your journey of inspiration and productivity starts today. Join us and let Sticky be the canvas
		for your dreams.
	</p>
</div>

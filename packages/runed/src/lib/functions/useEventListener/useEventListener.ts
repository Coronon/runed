import type { ValueOrGetter } from "$lib/internal/types.js";
import { boxed } from "$lib/internal/utils/boxed.svelte.js";
import { addEventListener } from "$lib/internal/utils/event.js";

export function useEventListener<TEvent extends keyof WindowEventMap>(
	target: ValueOrGetter<Window | null>,
	event: TEvent,
	handler: (this: Window, event: WindowEventMap[TEvent]) => unknown,
	options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<TEvent extends keyof DocumentEventMap>(
	target: ValueOrGetter<Document | null>,
	event: TEvent,
	handler: (this: Document, event: DocumentEventMap[TEvent]) => unknown,
	options?: boolean | AddEventListenerOptions
): void;

export function useEventListener<
	TElement extends HTMLElement,
	TEvent extends keyof HTMLElementEventMap,
>(
	target: ValueOrGetter<TElement | null>,
	event: TEvent,
	handler: (this: TElement, event: HTMLElementEventMap[TEvent]) => unknown,
	options?: boolean | AddEventListenerOptions
): void;

export function useEventListener(
	target: ValueOrGetter<EventTarget | null>,
	event: string,
	handler: EventListenerOrEventListenerObject,
	options?: boolean | AddEventListenerOptions
): void;

export function useEventListener(
	target: ValueOrGetter<EventTarget | null>,
	event: string,
	handler: EventListenerOrEventListenerObject,
	options?: boolean | AddEventListenerOptions
) {
	const $target = boxed(target);

	$effect(() => {
		if (!$target.value) return;
		return addEventListener($target.value, event, handler, options);
	});
}

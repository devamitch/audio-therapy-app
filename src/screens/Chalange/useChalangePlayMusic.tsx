import { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query';
import { shallow } from 'zustand/shallow';

import { useAppStore } from '@/core/store';
import { addChallangeVote, ChalangesResponse } from '@/lib/server/challange';
import { handleError, toast } from '@/lib/utils';

const useChalangePlayMusic = ({
	data,
	refetch,
}: {
	data?: ChalangesResponse | undefined;
	refetch?: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<ChalangesResponse, Error>>;
}) => {
	const [music, setMusic] = useState<string>();

	const user = useAppStore((state) => state?.user, shallow);

	const { playing } = useIsPlaying();

	const onPlayClick = async (id?: string) => {
		if (!id) return undefined;

		const artist = data?.artist1 === id ? data?.artist1Detail : data?.artist2Detail;

		const song = artist?.song;

		const url = song?.media;

		if (!url) return undefined;

		const regex = /(?:\.([^.]+))?$/;

		const ext = regex?.exec(url)?.[1];

		if (ext === 'mp3') {
			try {
				if (playing) {
					await TrackPlayer.pause();

					return;
				}

				const queue = await TrackPlayer.getQueue();

				if (queue.length >= 0) {
					if (queue?.[0]?.url !== url) {
						await TrackPlayer.remove(
							Array.from({ length: queue?.length }, (_, index) => index)
						);
					}
				}

				await TrackPlayer.add({
					url,
					title: song?.title ?? 'Soul Searching (Demo)',
					artist: artist?.artist?.name ?? 'David Chavez',
					artwork: song?.banner ?? 'https://rntp.dev/example/Soul%20Searching.jpeg',
					duration: song?.duration ?? 77,
				});

				await TrackPlayer.play();
			} catch (err) {
				console.log(err);
			}

			return;
		} else if (ext === 'mp4') {
			return;
		}

		return setMusic(url);
	};

	const resourse = useMemo(() => {
		if (!music) return undefined;
		const regex = /(?:\.([^.]+))?$/;

		const ext = regex?.exec(music)?.[1];

		if (music?.includes('https://www.youtube.com/watch?v=')) {
			return { url: music } as const;
		} else if (music?.includes('https://www.youtube.com/embed/')) {
			return {
				html: `<iframe src="${music}?utm_source=generator" width="100%" height="100%" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
			} as const;
		} else if (music?.includes('https://open.spotify.com/embed/track/')) {
			return {
				html: `<iframe src="${music}?utm_source=generator" width="100%" height="100%" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
			} as const;
		} else if (music?.includes('spotify:track:')) {
			const parsedSpotifyId = music?.split('spotify:track:')[1];

			return {
				html: `<!DOCTYPE html><html><body><iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${parsedSpotifyId}?utm_source=generator" width="100%" height="500" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></body></html>`,
			} as const;
		} else if (ext === 'mp3') {
			return { song: music } as const;
		} else if (ext === 'mp4') {
			return { video: music } as const;
		}

		return undefined;
	}, [music]);

	const { mutate } = useMutation({
		mutationKey: [user?._id || user?.id],
		mutationFn: addChallangeVote,
		onError: (error) => {
			handleError(error);
		},
		onSuccess({ message }) {
			toast.success(message || 'Sucessfully voted');
			refetch && refetch();
		},
	});

	const onBet = useCallback(
		(_id?: string, chalangeId?: string) => {
			mutate({
				by: user?._id || user?.id,
				artist: _id,
				challange: chalangeId,
			});
		},
		[mutate, user?._id, user?.id]
	);

	return { onPlayClick, music, resourse, onBet };
};

export default useChalangePlayMusic;

const styles = StyleSheet.create({});

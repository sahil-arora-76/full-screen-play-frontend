/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Cricket = () => {
	const [media, setMedia] = useState<any>([]);
	const mediaRef = useRef<HTMLVideoElement>(null);
	const [activeMedia, setActiveMedia] = useState<any>(0);

	useEffect(() => {
		console.log(media);
	}, [media]);
	const sendReq = async () => {
		try {
			const response = await axios.get('http://localhost:8000/');
			if (response.status === 200) {
				setMedia(response.data.message);
			} else {
				alert('restart kiosk');
			}
		} catch (e) {
			console.log(e);
			alert('restart kiosk');
		}
	};

	useEffect(() => {
		sendReq();
	}, []);

	if (!media || media.length <= 0) return <span>Restart kiosk</span>;

	return (
		<div className="cricket-leader-board-container">
			{media[activeMedia].type === 'vid' ? (
				<video
					ref={mediaRef}
					src={'/' + media[activeMedia].name}
					onEnded={() => {
						if (activeMedia >= media.length - 1) {
							setActiveMedia(0);
						} else {
							setActiveMedia(activeMedia + 1);
						}
					}}
					autoPlay
					style={{
						width: '100vw',
						height: '100vh',
						objectFit: 'cover',
						background: 'black',
					}}
					onLoad={() => {
						if (mediaRef) {
							media.current.play();
						}
					}}
				/>
			) : (
				<img
					src={'/' + media[activeMedia].name}
					style={{
						width: '100vw',
						height: '100vh',
						objectFit: 'cover',
						background: 'black',
					}}
					onLoad={() => {
						setTimeout(() => {
							if (activeMedia >= media.length - 1) {
								setActiveMedia(0);
							} else {
								setActiveMedia(activeMedia + 1);
							}
						}, 10000);
					}}
				/>
			)}
		</div>
	);
};

export default Cricket;

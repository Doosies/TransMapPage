import React, { useEffect, useRef } from 'react';
import { useMemo } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
    interface Marker {
        title: string;
        latlng: any;
    }
}
 
function useKaKaoMap(markers: Marker[]){
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const pos = markers.length > 0
    ? markers[0].latlng 
    : new window.kakao.maps.LatLng(37.5666805, 126.9784147);

    const options = useMemo(() =>({
      center: new window.kakao.maps.LatLng(pos.getLat(), pos.getLng()), 
      level: 3,
    }), [pos]);
    const container = useRef(null);

    useEffect(() => {
        console.log("맵 생성", markers);
        const map = new window.kakao.maps.Map(container.current, options);
        //마커를 지도에 표시한다.
        markers.forEach(marker => {
            const latlng = [marker.latlng.getLat(), marker.latlng.getLng()];

            const mk = new window.kakao.maps.Marker({
                map: map,
                position: marker.latlng,
                title: marker.title,
            });
            // var iwContent = `
            //     <div style="padding:5px;">
            //         Hello World! <br>
            //         <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">
            //             길찾기
            //         </a>
            //     </div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            var iwContent = `
            <div style="text-align: center;">
                ${marker.title}
            </div>`;
            var iwPosition = new window.kakao.maps.LatLng(latlng[0], latlng[1]); //인포윈도우 표시 위치입니다
            
            var infowindow = new window.kakao.maps.InfoWindow({
                position : iwPosition, 
                content : iwContent 
            });
            infowindow.open(map, mk); 


            // var infowindow = new window.kakao.maps.InfoWindow({
            //     map: map,
            //     position: marker.latlng,
            //     content: marker
            // });
            // const infoWindow = new window.kakao.maps.InfoWindow({
            //     content : '<div style="padding:5px;">인포윈도우 :D</div>' // 인포윈도우에 표시할 내
            // });
            // infoWindow.open(map, )
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        // marker.setMap(map);

    }, [markers]);

    return container;
}

export default useKaKaoMap;
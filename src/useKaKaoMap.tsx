import { useEffect, useRef } from 'react';
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
      level: 8,
    }), [pos]);
    const container = useRef(null);

    useEffect(() => {
        // console.log("맵 생성", markers);
        const map = new window.kakao.maps.Map(container.current, options);
        //마커를 지도에 표시한다.
        markers.forEach(marker => {
            // 마커 관련
            const latlng = [marker.latlng.getLat(), marker.latlng.getLng()];

            const mk = new window.kakao.maps.Marker({
                map: map,
                position: marker.latlng,
                title: marker.title,
            });
            

            // 인포윈도우 관련
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


            // 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
            window.kakao.maps.event.addListener(mk, 'click', function() {
                window.location.href = `https://map.kakao.com/link/to/${marker.title},${latlng[0]},${latlng[1]}`;
            });

            
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        // marker.setMap(map);

    }, [markers]);

    return container;
}

export default useKaKaoMap;
import { useEffect, useRef } from 'react';
import { useMemo } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}
 
function useKaKaoMap(addrs: string[]){
    

    const options = useMemo(() =>({
      center: new window.kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 8,
    }), []);
    const container = useRef(null);

    useEffect(() => {
        const map = new window.kakao.maps.Map(container.current, options);
        const geocoder = new window.kakao.maps.services.Geocoder();

        for(const addr of addrs) {
            geocoder.addressSearch(addr, (result: any, status: any)=> {
      
              if (status === window.kakao.maps.services.Status.OK) {
                //받아온 위도, 경도 좌표정보
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                const mk = new window.kakao.maps.Marker({
                    map: map,
                    position: coords,
                    title: addr,
                });


                // 인포윈도우 관련
                var iwContent = `<div style="text-align: center;">
                                    ${addr}
                                </div>`;
                var iwPosition = new window.kakao.maps.LatLng(coords.getLat(), coords.getLng()); //인포윈도우 표시 위치입니다
                
                var infowindow = new window.kakao.maps.InfoWindow({
                    position : iwPosition, 
                    content : iwContent 
                });
                infowindow.open(map, mk); 


                // 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
                window.kakao.maps.event.addListener(mk, 'click', function() {
                    window.open(`https://map.kakao.com/link/to/${addr},${coords.getLat()},${coords.getLng()}`);
                });

                map.setCenter(coords);
              }
            });
        }
        return() => {console.log("제거됨");};
    }, [addrs, options]);

    return container;
}

export default useKaKaoMap;
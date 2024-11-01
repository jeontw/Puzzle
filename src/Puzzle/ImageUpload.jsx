import { useState } from 'react'; // React에서 useState 훅을 가져옵니다.

function ImageUpload() {
    // 선택된 이미지 URL을 저장하는 상태 변수 생성, 초기값은 null
    const [selectedImage, setSelectedImage] = useState(null);

    // 사용자가 파일을 선택할 때 호출되는 함수
    const handleImageChange = (e) => {
        // 사용자가 업로드한 파일 중 첫 번째 파일을 가져옵니다.
        const file = e.target.files[0];
        if (file) {
            // 파일이 있을 경우, 브라우저에서 사용할 수 있는 임시 URL을 생성하고 상태에 저장합니다.
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            {/* 이미지 파일 선택 입력 필드 */}
            <input
                type="file" // 파일을 업로드할 수 있는 입력 타입
                accept="image/*" // 이미지 파일만 선택할 수 있도록 제한
                onChange={handleImageChange} // 파일이 선택될 때 handleImageChange 함수 호출
            />

            {/* 선택된 이미지가 있을 때 미리보기 렌더링 */}
            {selectedImage && (
                <div>
                    <img
                        src={selectedImage} // 미리보기 이미지의 소스로 선택된 이미지 URL을 사용
                        alt="Preview" // 이미지 대체 텍스트
                        style={{ maxWidth: '300px', marginTop: '20px' }} // 최대 너비와 여백 설정
                    />
                </div>
            )}
        </div>
    );
}

export default ImageUpload; // ImageUpload 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냅니다.

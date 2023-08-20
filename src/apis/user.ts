import axios from 'axios';
import { HOST, API_HOST } from '../config';
import { UserResponseDto, ProfileChangeRequestDto } from '../dto/user';
import { ApiResponse } from '../dto/base';
// 서버에서 User ID를 통해 해당 유저의 정보를 가져옴, 회원 가입 여부 등에 사용
export const findUser = async (userId: string) : Promise<UserResponseDto> => {
  const foundUser : ApiResponse<UserResponseDto> = await axios.get(
    `${API_HOST}/users/user_id/${userId}`
    ,{ withCredentials: true }
  );
  return foundUser.data;
};

// UID를 이용하여 유저 정보를 찾는다. 채팅방 참가자의 정보를 가져오기 위해 사용
export const findUserUsingId = async (id: number) => {
  const foundUser: ApiResponse<UserResponseDto> = await axios.get(
    `${API_HOST}/users/${id}`
    ,{ withCredentials: true }
  );
  return foundUser.data;
};

// 프로필 변경(사진, 배경, 이름 등등)
export const changeProfile = async (profileData: ProfileChangeRequestDto) => {
  await axios.put(`${API_HOST}/users/${profileData.id}`, profileData, { withCredentials: true });
  return profileData;
};

// 이미지를 서버로 업로드
export const uploadImageFile = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  const imageUrl: ApiResponse<string> = await axios.post(
    `${API_HOST}/file/upload/`,
    formData
    , { withCredentials: true }
  );
  console.log(imageUrl.data)
  return `${HOST}/${imageUrl.data}`;

};
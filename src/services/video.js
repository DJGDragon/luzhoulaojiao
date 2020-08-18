import request from '@/utils/request';


export async function submitVideo(params) {
  const formData = new FormData();
  for (const key in params) {
      if(Array.isArray(params[key])){
        formData.append(`${key}`,JSON.stringify(params[key]))
      }
      else{
        formData.append(key, params[key]);
      }

  }
  return request('/video/submit', {
    method: 'POST',
    body: formData,
  });
}
export async function queryVideo(params) {
  return request('/video/query', {
    method: 'POST',
    body: params,
  });
}
export async function deleteVideo(params) {
  return request('/video/delete', {
    method: 'POST',
    body: params,
  });
}
export async function emptyVideo(params) {
  return request('/video/empty', {
    method: 'POST',
    body: params,
  });
}

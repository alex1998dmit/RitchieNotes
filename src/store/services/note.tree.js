import axios from 'axios';
import to from 'await-to-js';
import axiosConfigs from '../../utils/configs/axios';

export default {
  getItems: async () => {
    const [err, resp] = await to(axios.get(
      `${axiosConfigs.host}/notestree`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }
    ));
    if (err) {
      throw err;
    }
    console.log(resp);
    return resp.data.items;
  }
}
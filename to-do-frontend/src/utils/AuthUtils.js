import jwt_decode from 'jwt-decode';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';


export const decryptStoredToken = () => {
    if (localStorage.getItem('jwtToken')) {
        const encryptedToken = localStorage.getItem('jwtToken');
        var decryptedToken = CryptoAES.decrypt(encryptedToken.toString(), 'fafhao#4fa');
        return decryptedToken.toString(CryptoENC);
    }
    return null;
}

export const getHeader = () => {
    const token = decryptStoredToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}
export const getBearerToken = () => {
    const token = decryptStoredToken();
    return {
        Authorization: `Bearer ${token}`
    }
}

export const encryptAndStoreTokenAndUserName = (token) => {
    var ciphertext = CryptoAES.encrypt(token, 'fafhao#4fa');
    localStorage.setItem('jwtToken', ciphertext);
    var decoded = jwt_decode(token);
    localStorage.setItem('user', decoded.username);
}


export const isAuthenticated = () => {
    try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            var encoded = decryptStoredToken();
            var decoded = jwt_decode(encoded);
            const isExpired = Date.now() >= decoded.exp * 1000
            return (!isExpired);
        } else {
            return false;
        }
    } catch (e) {
        // console.log(e);
        return false;
    }
}

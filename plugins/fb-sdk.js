// plugins/facebook-sdk.js

export default async({ app }) => {
    // Load Facebook SDK asynchronously
    const loadFbSdk = () => {
        return new Promise((resolve) => {
            window.fbAsyncInit = function() {
                // Inisialisasi Facebook SDK
                FB.init({
                    appId: '1092346238057732', // Ganti dengan App ID Anda
                    cookie: true,
                    xfbml: true,
                    version: 'v18.0', // Ganti dengan versi SDK yang sesuai
                });

                // SDK telah diinisialisasi, kembalikan resolusi
                resolve();
            };

            // Load SDK asynchronously
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        });
    };

    // Panggil fungsi untuk memuat dan inisialisasi SDK
    await loadFbSdk();
};
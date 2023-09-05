import React, { useEffect } from 'react';

const OAuthRedirect: React.FC = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    console.log(window.location.origin)
    if (code) {
      window.opener.postMessage({ code: code }, window.location.origin);
      window.close();
    }
  }, []);

  return (
    <div>
      인증 중...
    </div>
  );
}

export default OAuthRedirect;
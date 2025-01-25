console.log('QR Code Extension: Starting...');

let qrContainer = null;
let isExpanded = false;

// 创建浮动 logo 按钮
function createFloatingLogo() {
  const logoUrl = getLogo();
  if (!logoUrl) return;

  // 创建浮动容器
  qrContainer = document.createElement('div');
  qrContainer.id = 'website-qr-container';
  qrContainer.className = 'collapsed';
  document.body.appendChild(qrContainer);

  // 创建 logo 按钮
  const logoButton = document.createElement('div');
  logoButton.id = 'qr-logo-button';
  logoButton.innerHTML = `<img src="${logoUrl}" alt="Site Logo">`;
  qrContainer.appendChild(logoButton);

  // 创建二维码容器（初始隐藏）
  const qrContent = document.createElement('div');
  qrContent.id = 'qr-content';
  qrContent.classList.add('hidden');
  qrContainer.appendChild(qrContent);

  // 添加点击事件
  logoButton.addEventListener('click', toggleQRCode);
}

// 展开显示二维码
function showQRCode() {
  if (!qrContainer || isExpanded) return;

  const qrContent = qrContainer.querySelector('#qr-content');
  if (!qrContent) return;

  // 如果是第一次展开，需要生成二维码
  if (!qrContent.hasChildNodes()) {
    // 获取当前网站信息
    const currentUrl = window.location.href;
    const siteName = window.location.hostname;
    const pageTitle = document.title.substring(0, 15);
    const logoUrl = getLogo();

    // 创建QR码的容器
    const qrDiv = document.createElement('div');
    qrDiv.id = 'qr-code';
    qrContent.appendChild(qrDiv);

    // 创建二维码
    new QRCode(qrDiv, {
      text: currentUrl,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    // 添加 logo 到二维码中心
    if (logoUrl) {
      setTimeout(() => {
        const qrImage = qrDiv.querySelector('img');
        if (qrImage) {
          const logoContainer = document.createElement('div');
          logoContainer.id = 'qr-logo-container';
          const logo = document.createElement('img');
          logo.src = logoUrl;
          logo.id = 'qr-logo';
          logoContainer.appendChild(logo);
          qrDiv.appendChild(logoContainer);
        }
      }, 100);
    }

    // 添加网站信息
    const infoDiv = document.createElement('div');
    infoDiv.className = 'qr-info';
    infoDiv.innerHTML = `
      <div class="site-name">${siteName}</div>
      <div class="page-title"><strong>${pageTitle}</strong></div>
    `;
    qrContent.appendChild(infoDiv);
  }

  // 显示内容
  qrContent.classList.remove('hidden');
  qrContainer.className = 'expanded';
  isExpanded = true;
}

// 隐藏二维码
function hideQRCode() {
  if (!qrContainer || !isExpanded) return;
  
  const qrContent = qrContainer.querySelector('#qr-content');
  if (qrContent) {
    qrContent.classList.add('hidden');
  }
  qrContainer.className = 'collapsed';
  isExpanded = false;
}

// 切换二维码显示状态
function toggleQRCode(e) {
  if (isExpanded) {
    hideQRCode();
  } else {
    showQRCode();
  }
}

// 获取网站logo的函数
function getLogo() {
  const favicon = document.querySelector('link[rel="icon"]') || 
                 document.querySelector('link[rel="shortcut icon"]');
  if (favicon) {
    return favicon.href;
  }
  
  const logos = document.querySelectorAll('img[src*="logo"]');
  if (logos.length > 0) {
    return logos[0].src;
  }
  
  return null;
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFloatingLogo);
} else {
  createFloatingLogo();
} 
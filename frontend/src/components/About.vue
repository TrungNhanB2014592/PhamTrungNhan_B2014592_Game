<template>
  <body>
    <div class="container">
      <div class="demo">
        <video controls autoplay muted none id="myVideo">
          <source src="/img/video1.webm" />
        </video>
      </div>
      <section class="about">
        <div class="heading text-center">
          <h1>Về chúng tôi</h1>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="card">
                <img src="/img/img8.png" class="about-image" alt="" />
              </div>
            </div>

            <div class="col-md-6">
              <h3 class="topic">Tham gia vào cộng đồng<span></span></h3>
              <p class="text">
                Gặp gỡ mọi người, tham gia nhóm, thành lập bang hội, tham gia
                thảo luận trong trò chơi và hơn thế nữa! Với hơn 100 triệu bạn
                bè (hoặc đối thủ) tiềm năng, niềm vui là vô tận.
              </p>
            </div>
          </div>
        </div>

        <div class="test">
          <div class="container about-content-two">
            <div class="row">
              <div class="col-md-6">
                <h3>Khám phá phần cứng</h3>
                <p class="text">
                  Với Steam Deck và tai nghe Valve Index, chúng tôi đã vượt qua
                  ranh giới của trò chơi trên PC.
                </p>
              </div>

              <div class="col-md-6">
                <div class="card">
                  <img src="/img/img9.png" class="about-image" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row about-content-three">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <img src="/img/img10.png" class="img-fluid" />
            </div>
            <div class="col-md-6">
              <h3>Xuất bản trò chơi của bạn</h3>
              <p class="text">
                Steamworks là một bộ công cụ và dịch vụ được thiết kế để giúp
                các nhà phát hành và nhóm phát triển tận dụng tối đa việc phân
                phối trò chơi của họ trên Steam.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </body>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.container {
  background-color: #1d2024;
}
.text {
  color: white;
}
h3 {
  color: white;
}
h1 {
  color: white;
}
.card img {
  border-style: none;
  border: 0px;
  background-color: #1d2024;
}

.banner-about {
  position: relative;
  height: 380px;
}

.center {
  position: absolute;
  bottom: 8px;
  left: 16px;
  font-size: 40px;
  color: white;
  font-weight: bolder;
}

/* .test {
    background-color: #04AA6D;
} */

.heading {
  margin: 30px 0;
}

.title-about {
  color: #04aa6d;
}

.about-content-two {
  margin-top: 40px;
  padding: 10px;
}

.about-content-three {
  margin-top: 20px;
}
.demo {
  background-color: #1d2024;
}
.demo video {
  width: 100%;
  height: 500px;
}
#myVideo {
  /* position: fixed; */
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
body {
  background-color: #1d2024;
}
</style>

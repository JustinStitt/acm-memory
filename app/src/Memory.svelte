<script>
  import { poppress } from "./poppress.js";
  const logosize = 225;
  const popconfig = { newWidth: logosize * 1.5, defaultTimeout: 75 };
  const click = () => {
    console.log("clicked");
  };
</script>

<div class="main">
  <img
    class="logo"
    id="designl"
    src="design-logo.svg"
    alt="ACM Design Team Logo"
    width={logosize}
    use:poppress={popconfig}
  />
  <img
    class="logo"
    id="devl"
    src="dev-logo.svg"
    alt="ACM Dev Team Logo"
    width={logosize}
    use:poppress={popconfig}
  />
  <img
    class="logo"
    id="algol"
    src="algo-logo.svg"
    alt="ACM Algo Team Logo"
    width={logosize}
    use:poppress={popconfig}
  />
  <img
    class="logo"
    id="ail"
    src="ai-logo.svg"
    alt="ACM AI Team Logo"
    width={logosize}
    use:poppress={popconfig}
  />
</div>

<style>
  .main {
    background-color: rebeccapurple;
  }

  .logo {
    position: fixed;
    transform: translateX(-50%) rotateZ(45deg);
    transition: 0.4s ease-out;
    background-color: rgba(52, 160, 92, 0.472);
  }

  #ail {
    left: 50%;
    top: 55%;
  }

  #algol {
    left: 40%;
    top: 35%;
  }

  #devl {
    left: 60%;
    top: 35%;
  }

  #designl {
    left: 50%;
    top: 15%;
  }
</style>

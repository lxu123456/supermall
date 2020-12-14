<template>
	<div class="wrapper">
  <ul class="content">
	  <li>分类泪飙1</li>
	  <li>分类泪飙2</li>
	  <li>分类泪飙3</li>
	  <li>分类泪飙4</li>
	  <li>分类泪飙5</li>
	  <li>分类泪飙6</li>
	  <li>分类泪飙7</li>
	  <li>分类泪飙8</li>
	  <li>分类泪飙9</li>
	  <li>分类泪飙10</li>
	  <li>分类泪飙11</li>
	  <li>分类泪飙12</li>
	  <li>分类泪飙13</li>
	  <li>分类泪飙14</li>
	  <li>分类泪飙15</li>
	  <li>分类泪飙16</li>
	  <li>分类泪飙17</li>
	  <li>分类泪飙18</li>
	  <li>分类泪飙19</li>
	  <li>分类泪飙20</li>
	  <li>分类泪飙21</li>
	  <li>分类泪飙22</li>
	  <li>分类泪飙23</li>
	  <li>分类泪飙24</li>
	  <li>分类泪飙25</li>
	  <li>分类泪飙26</li>
	  <li>分类泪飙27</li>
	  <li>分类泪飙28</li>
	  <li>分类泪飙29</li>
	  <li>分类泪飙30</li>
	  <li>分类泪飙31</li>
	  <li>分类泪飙32</li>
	  <li>分类泪飙33</li>
	  <li>分类泪飙34</li>
	  <li>分类泪飙35</li>
	  <li>分类泪飙36</li>
	  <li>分类泪飙37</li>
	  <li>分类泪飙38</li>
	  <li>分类泪飙39</li>
	  <li>分类泪飙40</li>
	  <li>分类泪飙41</li>
	  <li>分类泪飙42</li>
	  <li>分类泪飙43</li>
	  <li>分类泪飙44</li>
	  <li>分类泪飙45</li>
	  <li>分类泪飙46</li>
	  <li>分类泪飙47</li>
	  <li>分类泪飙48</li>
	  <li>分类泪飙49</li>
	  <li>分类泪飙50</li>
	  <li>分类泪飙51</li>
	  <li>分类泪飙52</li>
	  <li>分类泪飙53</li>
	  <li>分类泪飙54</li>
	  <li>分类泪飙55</li>
	  <li>分类泪飙56</li>
	  <li>分类泪飙57</li>
	  <li>分类泪飙58</li>
	  <li>分类泪飙59</li>
	  <li>分类泪飙60</li>
	  <li>分类泪飙61</li>
	  <li>分类泪飙62</li>
	  <li>分类泪飙63</li>
	  <li>分类泪飙64</li>
	  <li>分类泪飙65</li>
	  <li>分类泪飙66</li>
	  <li>分类泪飙67</li>
	  <li>分类泪飙68</li>
	  <li>分类泪飙69</li>
	  <li>分类泪飙70</li>
	  <li>分类泪飙71</li>
	  <li>分类泪飙72</li>
	  <li>分类泪飙73</li>
	  <li>分类泪飙74</li>
	  <li>分类泪飙75</li>
	  <li>分类泪飙76</li>
	  <li>分类泪飙77</li>
	  <li>分类泪飙78</li>
	  <li>分类泪飙79</li>
	  <li>分类泪飙80</li>
	  <li>分类泪飙81</li>
	  <li>分类泪飙82</li>
	  <li>分类泪飙83</li>
	  <li>分类泪飙84</li>
	  <li>分类泪飙85</li>
	  <li>分类泪飙86</li>
	  <li>分类泪飙87</li>
	  <li>分类泪飙88</li>
	  <li>分类泪飙89</li>
	  <li>分类泪飙90</li>
	  <li>分类泪飙91</li>
	  <li>分类泪飙92</li>
	  <li>分类泪飙93</li>
	  <li>分类泪飙94</li>
	  <li>分类泪飙95</li>
	  <li>分类泪飙96</li>
	  <li>分类泪飙97</li>
	  <li>分类泪飙98</li>
	  <li>分类泪飙99</li>
	  <li>分类泪飙100</li>
  </ul>
</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
  export default {
    name: "Category",
	data(){
		return{
			scroll:null
		}
	},
	mounted(){
		this.scroll = new BScroll(document.querySelector(".wrapper"),{
			probeType:3,
			pullUpload:true
		});
		this.scroll.on('scroll',null)
		this.scroll.on('scrollEnd',() => {
			console.log('more.....');
		});
	}
  }
</script>

<style scoped>
	.wrapper{
		height: 150px;
		background-color: #FF5777;
	}

</style>

点云 ShaderMaterial 稀疏化过远的点 方案验证

ShaderMaterial包含两个shader：vertexShader和fragmentShader
fragmentShader：经过验证可以对像素点稀疏化，但无法对geometry对象中描述的点稀疏化。

![image](https://github.com/xiyanma/blog/assets/37499101/80129c1a-9aef-40c7-9792-8bb1acfb9f9a)


vertexShader：无法丢弃顶点，如果设置w通道为0，即让坐标转换成笛卡尔坐标系时丢失，会导致整个材质显示不出来。

![image](https://github.com/xiyanma/blog/assets/37499101/c80cb4bb-12ad-4f44-9f16-f6e12bfafb30)



结论：由于WebGL不支持GeometryShader。现有的shader无法实现，所以最好在CPU中过滤点。

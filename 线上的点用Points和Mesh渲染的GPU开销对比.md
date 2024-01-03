线上的点用Points/Mesh渲染的GPU开销对比
对比指标
GPU memory：GPU内存的使用情况。
GPU draw calls：渲染引擎向GPU提交绘制指令的次数。每一次绘制调用都会产生一定的CPU到GPU的开销。
统计方式
GPU memory
估算值：
一个object3D：通过object3D对象的geometry的索引（geometry.index.array.byteLength）以及geometry上所有属性（geometry.attributes[ name ].array.byteLength）的字节长度来计算整个object3D对象的内存占用。
折线：递归折线上所有的object3d的内存占用，累加得到折线标注物的内存占用。
GPU draw calls 
精确值：three.js的render对象上有：render.info.render.calls
结论
GPU memory
 统计了156 条折线。
用Mesh渲染折线上的点，所有折线共占用 1.63 MB GPU内存。
用Points渲染折线上的点，所有折线共占用 321.73 KB GPU内存。
- GPU内存占用减少为原来的19.27%。
GPU draw calls 
统计了场景中所有物体初始化渲染。
Mesh：
GPU draw calls  538次。
（其他指标：
1. frame: 385
2. lines: 231
3. points: 24227787
4. triangles: 9186
memory: 
  1. geometries: 538
  2. textures: 0 ）
Points：
GPU draw calls  262次。
（其他指标：
1. frame: 760
2. lines: 231
3. points: 24229546
4. triangles: 4002
memory: 
  1. geometries: 262
  2. textures: 0 ）
结论：
- GPU draw calls  调用次数减少为原来的一半。
- Points性能更优的原因本质上是减少了triangles的渲染，以及通过合并减少了geometries的数量。
测试环境说明
测试电脑： 
[图片]
Chrome 浏览器

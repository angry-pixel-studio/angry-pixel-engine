export declare const fragmentShader = "#version 300 es\nprecision mediump float;\n\nout vec4 fragColor;\n\nin vec2 texCoords;\n\nuniform sampler2D texImage;\nuniform float alpha;\n\nvoid main()\n{\n    vec4 texColor = texture(texImage, texCoords);\n    if(texColor.a < 0.0001)\n        discard;\n    fragColor = vec4(texColor.rgb, alpha);\n}";

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Styled components for UI
const ConfiguratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 20px auto;
  gap: 20px;
`;

const ViewerContainer = styled.div`
  height: 500px;
  background-color: #f4f4f4;
  border-radius: 8px;
  overflow: hidden;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

// Define types for our configuration
type MaterialType = 'plastic' | 'metal' | 'wood';
type ColorType = 'white' | 'black' | 'red' | 'blue';
type SizeType = 'small' | 'medium' | 'large';
type TextureType = 'smooth' | 'matte' | 'glossy';

interface ConfigState {
  material: MaterialType;
  color: string;
  size: SizeType;
  texture: TextureType;
}

interface ConfigOption {
  id: string;
  label: string;
  description: string;
}

interface ConfigSection {
  title: string;
  options: ConfigOption[];
}

const configurationOptions: Record<keyof ConfigState, ConfigSection> = {
  material: {
    title: "Material",
    options: [
      { id: 'plastic', label: "Plastic", description: "Durable plastic finish" },
      { id: 'metal', label: "Metal", description: "Premium metal finish" },
      { id: 'wood', label: "Wood", description: "Classic wood finish" }
    ]
  },
  color: {
    title: "Color",
    options: [
      { id: 'white', label: "White", description: "Clean white finish" },
      { id: 'black', label: "Black", description: "Sleek black finish" },
      { id: 'red', label: "Red", description: "Bold red finish" },
      { id: 'blue', label: "Blue", description: "Classic blue finish" }
    ]
  },
  size: {
    title: "Size",
    options: [
      { id: 'small', label: "Small", description: "Compact size" },
      { id: 'medium', label: "Medium", description: "Standard size" },
      { id: 'large', label: "Large", description: "Large size" }
    ]
  },
  texture: {
    title: "Texture",
    options: [
      { id: 'smooth', label: "Smooth", description: "Clean smooth finish" },
      { id: 'matte', label: "Matte", description: "Non-reflective matte" },
      { id: 'glossy', label: "Glossy", description: "High-gloss finish" }
    ]
  }
};

// Scene components
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  );
}

// 3D Model Component
interface ProductModelProps {
  color: string;
  material: MaterialType;
  size: SizeType;
  texture: TextureType;
}

function ProductModel({ color, material, size, texture }: ProductModelProps) {
  const scaleMap: Record<SizeType, number> = {
    small: 0.8,
    medium: 1,
    large: 1.2
  };

  const scale = scaleMap[size];

  return (
    <mesh 
      castShadow 
      receiveShadow
      scale={[scale, scale, scale]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color}
        metalness={material === 'metal' ? 0.8 : 0}
        roughness={texture === 'glossy' ? 0.1 : texture === 'matte' ? 0.8 : 0.5}
      />
    </mesh>
  );
}

export const ProductConfigurator: React.FC = () => {
  const [config, setConfig] = useState<ConfigState>({
    material: 'plastic',
    color: '#ffffff',
    size: 'medium',
    texture: 'smooth'
  });

  const handleConfigChange = (key: keyof ConfigState, value: string) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <ConfiguratorContainer>
      <ViewerContainer>
        <Canvas
          shadows
          camera={{ position: [3, 3, 3], fov: 50 }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <Suspense fallback={null}>
            <ProductModel 
              color={config.color}
              material={config.material}
              size={config.size}
              texture={config.texture}
            />
            <OrbitControls />
            <Lighting />
            <gridHelper args={[10, 10]} />
            <axesHelper args={[5]} />
          </Suspense>
        </Canvas>
      </ViewerContainer>

      <Card>
        <CardHeader>
          <CardTitle>Product Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="material">
            <TabsList>
              {(Object.keys(configurationOptions) as Array<keyof ConfigState>).map((key) => (
                <TabsTrigger key={key} value={key}>
                  {configurationOptions[key].title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {(Object.keys(configurationOptions) as Array<keyof ConfigState>).map((key) => (
              <TabsContent key={key} value={key}>
                <OptionsGrid>
                  {configurationOptions[key].options.map((option) => (
                    <Button
                      key={option.id}
                      variant={config[key] === option.id ? "default" : "outline"}
                      onClick={() => handleConfigChange(key, option.id)}
                    >
                      <div>
                        <div>{option.label}</div>
                        <small>{option.description}</small>
                      </div>
                    </Button>
                  ))}
                </OptionsGrid>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </ConfiguratorContainer>
  );
};

import React from 'react';
import './IntegrationsScroll.css';

// Import your existing SVG icons using the same method as your ActiveIntegrations component
import GmailIcon from '../../assets/icons/gmail.svg?react';
import HubspotIcon from '../../assets/icons/hubspot.svg?react';
import OutlookIcon from '../../assets/icons/outlook.svg?react';
import NotionIcon from '../../assets/icons/notion.svg?react';
import GDriveIcon from '../../assets/icons/g-drive.svg?react';
import GSheetIcon from '../../assets/icons/g-sheet.svg?react';
import FigmaIcon from '../../assets/icons/figma.svg?react';
import OpenaiIcon from '../../assets/icons/openai.svg?react';
import MetaIcon from '../../assets/icons/meta.svg?react';
import NvidiaIcon from '../../assets/icons/nvidia.svg?react';

const integrations = [
  { name: 'Outlook', Icon: OutlookIcon },
  { name: 'Open AI', Icon: OpenaiIcon },
  { name: 'Meta', Icon: MetaIcon },
  { name: 'G-Sheet', Icon: GSheetIcon },
  { name: 'Figma', Icon: FigmaIcon },
  { name: 'Gmail', Icon: GmailIcon },
  { name: 'Nvidia', Icon: NvidiaIcon }
];

const IntegrationsScroll = () => {
  // Duplicate the array to create seamless infinite scroll
  const duplicatedIntegrations = [...integrations, ...integrations];

  return (
    <div className="scroll-container">
      <div className="scroll-content">
        {duplicatedIntegrations.map((integration, index) => (
          <div key={index} className="scroll-item">
            <integration.Icon style={{ width: '48px', height: '48px', fill: 'white' }} />
            <span>{integration.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsScroll;
